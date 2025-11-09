/** @jsx jsx */
import { React, jsx, type AllWidgetProps } from 'jimu-core'
import { JimuMapViewComponent, type JimuMapView } from 'jimu-arcgis'
import { useState, useRef, useEffect } from 'react'
import { loadArcGISJSAPIModules } from 'jimu-arcgis'
import type { IMConfig } from '../config'
import { OpenRouterService } from './openRouterService'
import { AISpatialService } from './aiSpatialService'
import './widget.css'

interface Message {
  id: number
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

interface ConversationContext {
  lastQuery?: string
  lastIntent?: any
  lastResults?: any
}

const Widget = (props: AllWidgetProps<IMConfig>) => {
  const [jimuMapView, setJimuMapView] = useState<JimuMapView>(null)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hello! I can help you control the map. Try commands like "zoom in", "print map", "enable layers", or type "help" for all options.',
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [currentMessage, setCurrentMessage] = useState('')
  const [showPrintTemplates, setShowPrintTemplates] = useState(false)
  const [printTemplates, setPrintTemplates] = useState<any[]>([])
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [conversationContext, setConversationContext] = useState<ConversationContext>({})
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const initialMessage = {
    id: 1,
    text: 'Hello! I can help you control the map. Try commands like "zoom in", "print map", "enable layers", or type "help" for all options.',
    sender: 'bot' as const,
    timestamp: new Date()
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const onActiveViewChange = (jmv: JimuMapView) => {
    if (jmv) {
      setJimuMapView(jmv)
      addBotMessage('Map connection established! I\'m ready to help you navigate.')
    }
  }

  const addBotMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now(),
      text,
      sender: 'bot',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, newMessage])
  }

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, newMessage])
  }

  const parseCommand = async (command: string) => {
    const lowerCommand = command.toLowerCase().trim()

    if (!jimuMapView || !jimuMapView.view) {
      addBotMessage('Please connect to a map first. Configure the widget in settings to select a map.')
      return
    }

    const view = jimuMapView.view

    // Check if AI is configured
    const hasAI = props.config?.openRouterApiKey && props.config?.openRouterModel
    
    // Debug: Log AI configuration status
    console.log('AI Configuration:', {
      hasApiKey: !!props.config?.openRouterApiKey,
      hasModel: !!props.config?.openRouterModel,
      apiKeyPreview: props.config?.openRouterApiKey?.substring(0, 10) + '...',
      model: props.config?.openRouterModel
    })
    
    // Check if this is a basic command (not an AI query)
    const isBasicCommand = lowerCommand.startsWith('zoom') ||
                          lowerCommand.includes('print') ||
                          lowerCommand.startsWith('enable') ||
                          lowerCommand.startsWith('disable') ||
                          lowerCommand.startsWith('show') ||
                          lowerCommand.startsWith('hide') ||
                          lowerCommand.startsWith('list') ||
                          lowerCommand.includes('help') ||
                          lowerCommand.includes('layers')
    
    const isComplexQuery = !isBasicCommand

    console.log('Query Analysis:', { command: lowerCommand, isComplexQuery, isBasicCommand, hasAI })

    if (hasAI && isComplexQuery) {
      await handleAIQuery(command)
      return
    }
    
    // If query is complex but AI not configured, inform user
    if (!hasAI && isComplexQuery) {
      addBotMessage(
        '🤖 This looks like an AI query, but AI features are not configured.\n\n' +
        'To enable AI features:\n' +
        '1. Click the settings (⚙️) button on this widget\n' +
        '2. Enter your OpenRouter API Key\n' +
        '3. Enter the model name (e.g., mistralai/mistral-7b-instruct)\n' +
        '4. Save settings\n\n' +
        'For basic commands, type "help".'
      )
      return
    }

    try {
      // Print command
      if (lowerCommand.includes('print') || lowerCommand.includes('print map') || lowerCommand === 'give print') {
        addBotMessage('Preparing to print the map...')
        await handlePrintMap()
      }
      // List layers command (check this first before enable/disable)
      else if (lowerCommand.includes('list layers') || lowerCommand.includes('show all layers') || lowerCommand === 'layers') {
        listAllLayers()
      }
      // Enable layer command - match "enable [layer name]" or "enable layer [name]"
      else if (lowerCommand.startsWith('enable ')) {
        handleLayerVisibility(command, true)
      }
      // Disable layer command - match "disable [layer name]" or "disable layer [name]"
      else if (lowerCommand.startsWith('disable ')) {
        handleLayerVisibility(command, false)
      }
      // Show layer command - match "show [layer name]" or "show layer [name]"
      else if (lowerCommand.startsWith('show ') && !lowerCommand.includes('show all') && !lowerCommand.includes('show layers')) {
        handleLayerVisibility(command, true)
      }
      // Hide layer command - match "hide [layer name]" or "hide layer [name]"
      else if (lowerCommand.startsWith('hide ')) {
        handleLayerVisibility(command, false)
      }
      // Zoom In command
      else if (lowerCommand.includes('zoom in') || lowerCommand === 'zoomin') {
        const currentZoom = view.zoom
        await view.goTo({ zoom: currentZoom + 1 })
        addBotMessage(`Zoomed in to level ${view.zoom}`)
      }
      // Zoom Out command
      else if (lowerCommand.includes('zoom out') || lowerCommand === 'zoomout') {
        const currentZoom = view.zoom
        await view.goTo({ zoom: currentZoom - 1 })
        addBotMessage(`Zoomed out to level ${view.zoom}`)
      }
      // Zoom to specific level
      else if (lowerCommand.includes('zoom to level') || lowerCommand.includes('zoom level')) {
        const match = lowerCommand.match(/(\d+)/)
        if (match) {
          const zoomLevel = parseInt(match[1])
          if (zoomLevel >= 0 && zoomLevel <= 23) {
            await view.goTo({ zoom: zoomLevel })
            addBotMessage(`Set zoom level to ${zoomLevel}`)
          } else {
            addBotMessage('Zoom level should be between 0 and 23')
          }
        } else {
          addBotMessage('Please specify a zoom level number (e.g., "zoom to level 10")')
        }
      }
      // Navigate/Zoom to address or postcode
      else if (lowerCommand.includes('zoom to') || lowerCommand.includes('navigate to') || lowerCommand.includes('go to')) {
        await handleNavigateToLocation(command)
      }
      // Get current zoom
      else if (lowerCommand.includes('current zoom') || lowerCommand.includes('what zoom')) {
        addBotMessage(`Current zoom level is ${view.zoom}`)
      }
      // Help command
      else if (lowerCommand === 'help' || lowerCommand.includes('what can you do')) {
        const aiFeatures = hasAI ? '\n\n🤖 AI-Powered School Queries:\n' +
          '• "schools in Cardiff" - Find schools by town/city\n' +
          '• "schools with postcode CF10" - Find schools by postcode area\n' +
          '• "school code 6604025" - Find school by code\n' +
          '• "Welsh medium schools in Swansea" - Find by language and location\n' +
          '• "schools around Newport" - Find schools in an area\n' +
          '• "Find schools near rivers" - Spatial analysis queries\n' +
          '• "Compare school distribution across local authorities"\n' +
          '• Ask in Welsh (Cymraeg) - I\'ll translate!' : ''

        addBotMessage(
          'I can help you with these commands:\n\n' +
          '📍 Navigation & Zoom Commands:\n' +
          '• "zoom in" - Zoom the map in by one level\n' +
          '• "zoom out" - Zoom the map out by one level\n' +
          '• "zoom to level [number]" - Zoom to a specific level (0-23)\n' +
          '• "zoom to [address/postcode]" - Navigate to a location (e.g., "zoom to Cardiff CF10 1BH")\n' +
          '• "navigate to [location]" - Go to any address or postcode\n' +
          '• "current zoom" - Show the current zoom level\n\n' +
          '🖨️ Print Commands:\n' +
          '• "print" or "print map" - Select from available print templates and print the map\n\n' +
          '🗺️ Layer Commands:\n' +
          '• "list layers" - Show all available layers\n' +
          '• "enable [layer name]" - Turn on a layer\n' +
          '• "disable [layer name]" - Turn off a layer\n' +
          '• "show [layer name]" - Turn on a layer\n' +
          '• "hide [layer name]" - Turn off a layer\n\n' +
          '❓ Other:\n' +
          '• "help" - Show this help message' +
          aiFeatures
        )
      }
      // Unknown command
      else {
        addBotMessage(
          'I didn\'t understand that command. Try "zoom in", "print map", "list layers", or type "help" for more options.'
        )
      }
    } catch (error) {
      addBotMessage(`Error executing command: ${error.message}`)
    }
  }

  const handlePrintMap = async () => {
    try {
      addBotMessage('Loading print templates from print service...')
      setIsLoadingTemplates(true)

      const [esriRequest] = await loadArcGISJSAPIModules([
        'esri/widgets/Print',
        'esri/request'
      ])

      // Print service URL
      const printServiceUrl = 'https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task'
      
      // Fetch available templates from print service
      try {
        const response = await esriRequest(printServiceUrl, {
          query: {
            f: 'json'
          },
          responseType: 'json'
        })

        if (response.data && response.data.parameters) {
          // Find the Layout_Template parameter
          const layoutParam = response.data.parameters.find((param: any) => 
            param.name === 'Layout_Template'
          )

          if (layoutParam && layoutParam.choiceList) {
            const templates = layoutParam.choiceList
            setPrintTemplates(templates)
            setShowPrintTemplates(true)
            setIsLoadingTemplates(false)
            
            // Display templates in chat
            let templateList = '📋 Available Print Templates:\n\n'
            templates.forEach((template: string, index: number) => {
              templateList += `${index + 1}. ${template}\n`
            })
            templateList += '\nClick on a template to print.'
            
            addBotMessage(templateList)
          } else {
            // If no templates found, use default
            await executePrint('MAP_ONLY')
          }
        }
      } catch (error) {
        console.error('Error fetching print templates:', error)
        addBotMessage('Could not load templates. Using default print template...')
        await executePrint('MAP_ONLY')
      }

    } catch (error) {
      setIsLoadingTemplates(false)
      addBotMessage(`Error initializing print: ${error.message}`)
      console.error('Print error:', error)
    }
  }

  const executePrint = async (templateName: string) => {
    try {
      addBotMessage(`Preparing to print with template: "${templateName}"...`)
      
      const [PrintViewModel, PrintTemplate] = await loadArcGISJSAPIModules([
        'esri/widgets/Print/PrintViewModel',
        'esri/rest/support/PrintTemplate'
      ])

      const printServiceUrl = 'https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task'
      
      addBotMessage('Sending print request to server. This may take a few moments...')

      // Create PrintViewModel directly
      const printVM = new PrintViewModel({
        view: jimuMapView.view,
        printServiceUrl: printServiceUrl
      })

      // Create print template
      const template = new PrintTemplate({
        format: 'pdf',
        layout: templateName,
        layoutOptions: {
          titleText: 'Map Print',
          authorText: 'Experience Builder',
          copyrightText: '',
          scaleBarUnits: 'Miles'
        }
      })

      try {
        // Execute print using the ViewModel
        const result = await printVM.print(template)
        
        if (result && result.url) {
          addBotMessage(`✅ Print completed! Opening your print in a new window...`)
          window.open(result.url, '_blank')
        } else {
          addBotMessage('❌ Print completed but no URL was returned.')
        }
      } catch (error) {
        addBotMessage(`❌ Print failed: ${error?.message || 'Unknown error'}`)
        console.error('Print execution error:', error)
      }
    } catch (error) {
      addBotMessage(`Error printing: ${error?.message || 'Unknown error'}`)
      console.error('Print template error:', error)
    } finally {
      setShowPrintTemplates(false)
      setIsLoadingTemplates(false)
    }
  }

  /**
   * AI-powered query handler with conversation context
   */
  const handleAIQuery = async (query: string) => {
    try {
      addBotMessage('🤖 AI is analyzing your query...')

      // Initialize AI services with proper config
      const aiConfig = {
        apiKey: props.config?.openRouterApiKey || '',
        model: props.config?.openRouterModel || 'mistralai/mistral-7b-instruct',
        baseUrl: 'https://openrouter.ai/api/v1',
        maxTokens: 6000,
        temperature: 0.3
      }
      
      const openRouterService = new OpenRouterService(aiConfig)
      const aiSpatialService = new AISpatialService(jimuMapView)

      // Build contextual query by combining with previous conversation
      let contextualQuery = query
      const lowerQuery = query.toLowerCase()
      
      // Keywords that indicate a NEW query (not a follow-up)
      const newQueryKeywords = ['find', 'show', 'list', 'what', 'where', 'which', 'how many', 
                                'schools near', 'schools in', 'schools around', 'analyze', 'compare']
      const hasNewQueryKeyword = newQueryKeywords.some(keyword => lowerQuery.includes(keyword))
      
      // If query has new intent keywords, clear previous context
      if (hasNewQueryKeyword && conversationContext.lastQuery) {
        console.log('🔄 New query detected, clearing previous context')
        setConversationContext({})
      }
      
      // Check if this is a follow-up that wants to refine previous results
      if (conversationContext.lastResults && conversationContext.lastQuery && !hasNewQueryKeyword) {
        // Pattern: "give shortest/closest/nearest"
        if ((lowerQuery.includes('shortest') || lowerQuery.includes('closest') || lowerQuery.includes('nearest')) &&
            (lowerQuery.includes('distance') || lowerQuery.includes('school'))) {
          
          // Sort previous results by distance and show top results
          if (conversationContext.lastResults.schools) {
            const sortedSchools = [...conversationContext.lastResults.schools].sort((a, b) => a.distance - b.distance)
            
            addBotMessage(`📍 Here are the closest schools from the previous query:\n`)
            let schoolsList = '\n🏫 Closest Schools (sorted by distance):\n'
            sortedSchools.slice(0, 10).forEach((school: any, index: number) => {
              schoolsList += `${index + 1}. ${school.name} - ${school.distance}m (${(school.distance / 1000).toFixed(2)}km)\n`
            })
            if (sortedSchools.length > 10) {
              schoolsList += `\n... and ${sortedSchools.length - 10} more schools\n`
            }
            addBotMessage(schoolsList)
            return // Don't run a new AI query
          }
        }
        
        // Pattern: "yes near [location]" or just "near [location]"
        if (lowerQuery.includes('yes') || lowerQuery.startsWith('near')) {
          const locationMatch = query.match(/(?:near|in|around)\s+(\w+)/i)
          if (locationMatch) {
            contextualQuery = `Find schools near ${locationMatch[1]} within 1km`
            addBotMessage(`📝 Refining search to: ${locationMatch[1]}`)
          } else {
            contextualQuery = `${conversationContext.lastQuery} ${query}`
          }
        }
        // General follow-up detection (only if very short AND has pronouns)
        else if (query.length < 20 && 
                (lowerQuery.includes('that') ||
                lowerQuery.includes('those') ||
                lowerQuery.includes('them') ||
                lowerQuery.includes('it'))) {
          contextualQuery = `Previous question: "${conversationContext.lastQuery}". Follow-up: "${query}"`
          addBotMessage(`📝 Understanding this as follow-up to: "${conversationContext.lastQuery}"`)
        }
      }

      // Check if query is in Welsh
      let englishQuery = contextualQuery
      if (query.match(/[âêîôûŵŷ]/i) || query.toLowerCase().includes('ysgol')) {
        addBotMessage('🏴󠁧󠁢󠁷󠁬󠁳󠁿 Detected Welsh language, translating...')
        englishQuery = await openRouterService.translateWelsh(query)
        addBotMessage(`Translation: "${englishQuery}"`)
      }

      // Parse intent using AI with context
      const intent = await openRouterService.parseIntent(englishQuery)
      
      console.log('AI Intent:', intent)
      
      // If AI confidence is low, try manual parsing for common patterns
      if (intent.confidence < 0.5) {
        // Try to manually parse location-based queries for postcode/town matching
        
        let location = null
        let postcode = null
        
        // Pattern 1: "schools in [town/city]"
        const match = englishQuery.match(/schools?\s+(?:in|at|around|near)\s+([a-z\s]+)/i)
        if (match) {
          location = match[1].trim()
        }
        
        // Pattern 2: "schools with postcode [code]"
        const postcodeMatch = englishQuery.match(/(?:postcode|post code|postal code)\s+([A-Z]{1,2}\d{1,2}[A-Z]?\s?\d?[A-Z]{2}?)/i)
        if (postcodeMatch) {
          postcode = postcodeMatch[1].trim().toUpperCase()
        }
        
        // Pattern 3: Just a postcode or town mentioned
        if (!location && !postcode) {
          const ukPostcodePattern = /\b([A-Z]{1,2}\d{1,2}[A-Z]?)\b/i
          const postcodeOnly = englishQuery.match(ukPostcodePattern)
          if (postcodeOnly) {
            postcode = postcodeOnly[1].toUpperCase()
          }
        }
        
        if (location || postcode) {
          const searchTerm = postcode || location
          const searchType = postcode ? 'postcode' : 'town'
          
          addBotMessage(`📝 Manually parsed: Finding schools by ${searchType}: "${searchTerm}"`)
          
          // Override intent with manual parsing
          intent.type = 'attribute_query'
          intent.action = 'query_by_attribute'
          intent.parameters = postcode ? { postcode: postcode } : { town: location }
          intent.confidence = 0.8
        } else {
          addBotMessage(`I'm not sure I understood that query. Try rephrasing like:\n` +
            `• "schools in Cardiff"\n` +
            `• "schools around Swansea"\n` +
            `• "schools with postcode CF10"\n` +
            `• "find school code 6604025"\n` +
            `• "Welsh medium schools in Newport"\n\n` +
            `Or try: "help" for more options`)
          return
        }
      }

      addBotMessage(`Understanding: ${intent.type} - ${intent.action}`)
      addBotMessage('📊 Executing query...')

      // Execute query
      const results = await aiSpatialService.executeSpatialQuery(intent)

      // Generate natural language response with context
      const response = await openRouterService.generateResponse(englishQuery, results)
      addBotMessage(response)

      // Save conversation context for follow-up questions
      setConversationContext({
        lastQuery: query,
        lastIntent: intent,
        lastResults: results
      })

      // Display structured results
      if (results.count !== undefined) {
        let detailedResults = `\n📈 Results: ${results.count} items found`
        
        // Show search parameters if available
        if (results.searchTerm) {
          detailedResults += ` matching "${results.searchTerm}"`
        }
        if (results.location) {
          detailedResults += ` in ${results.location}`
        }
        detailedResults += '\n'
        
        if (results.schools && results.schools.length > 0) {
          // Check if this is an attribute query (has full school details)
          const firstSchool = results.schools[0]
          const isAttributeQuery = firstSchool.schoolCode || !firstSchool.distance
          
          if (isAttributeQuery) {
            // Display detailed school information for attribute queries
            detailedResults += '\n🏫 School Details:\n'
            results.schools.forEach((school: any) => {
              detailedResults += `\n📍 ${school.name}\n`
              if (school.schoolCode) detailedResults += `   Code: ${school.schoolCode}\n`
              if (school.language) detailedResults += `   Language: ${school.language}\n`
              if (school.type) detailedResults += `   Type: ${school.type}\n`
              if (school.street) detailedResults += `   Address: ${school.street}\n`
              if (school.town) detailedResults += `   Town: ${school.town}\n`
              if (school.postcode) detailedResults += `   Postcode: ${school.postcode}\n`
              if (school.status) detailedResults += `   Status: ${school.status}\n`
              if (school.gender) detailedResults += `   Gender: ${school.gender}\n`
              if (school.coordinates) {
                detailedResults += `   Location: ${school.coordinates.lat.toFixed(5)}, ${school.coordinates.lon.toFixed(5)}\n`
              }
            })
          } else {
            // Display distance-based results (existing logic)
            detailedResults += '\n🏫 Schools (sorted by distance):\n'
            results.schools.slice(0, 10).forEach((school: any, index: number) => {
              detailedResults += `${index + 1}. ${school.name}`
              if (school.distance !== undefined) {
                detailedResults += ` - ${school.distance}m (${school.distanceKm || (school.distance / 1000).toFixed(2)}km)`
              }
              if (school.town) {
                detailedResults += ` [${school.town}]`
              }
              detailedResults += '\n'
            })
            if (results.schools.length > 10) {
              detailedResults += `\n... and ${results.schools.length - 10} more schools\n`
            }
          }
        }

        if (results.impactedSchools) {
          detailedResults += '\n💧 Water Quality Impact:\n'
          results.impactedSchools.slice(0, 5).forEach((item: any) => {
            detailedResults += `• ${item.school} near ${item.waterArea} (${item.distance}m)\n`
          })
          if (results.impactedSchools.length > 5) {
            detailedResults += `... and ${results.impactedSchools.length - 5} more\n`
          }
        }

        if (results.accessibilityData) {
          detailedResults += '\n🏞️ Park Accessibility:\n'
          results.accessibilityData.slice(0, 3).forEach((item: any) => {
            detailedResults += `• ${item.localAuthority}: ${item.nearestPark} (${item.distanceKm}km)\n`
          })
        }

        if (results.highRisk) {
          detailedResults += `\n⚠️ High Flood Risk: ${results.highRisk.count} schools\n`
          if (results.moderateRisk) {
            detailedResults += `⚠️ Moderate Risk: ${results.moderateRisk.count} schools\n`
          }
        }

        if (results.opportunities) {
          detailedResults += '\n🌿 Education Opportunities:\n'
          results.opportunities.slice(0, 3).forEach((item: any) => {
            detailedResults += `• ${item.school}: ${item.rating}\n`
          })
        }

        if (results.comparison) {
          detailedResults += '\n🏛️ Local Authority Comparison:\n'
          results.comparison.slice(0, 3).forEach((item: any) => {
            detailedResults += `• ${item.localAuthority}: ${item.schoolCount} schools\n`
          })
        }

        addBotMessage(detailedResults)
      }

    } catch (error) {
      console.error('AI query error:', error)
      addBotMessage(`❌ Error processing AI query: ${error?.message || 'Unknown error'}\n\nPlease check that your OpenRouter API key is configured in the widget settings.`)
    }
  }

  const handleTemplateSelection = (template: string) => {
    setShowPrintTemplates(false)
    executePrint(template)
  }

  const handleLayerVisibility = (command: string, visible: boolean) => {
    const view = jimuMapView.view
    const map = view.map
    
    if (!map || !map.layers) {
      addBotMessage('No layers found in the map.')
      return
    }

    // Extract layer name from command (preserve original case)
    let layerName = command.trim()
    
    // Remove command keywords to get the layer name (case insensitive removal)
    const keywords = ['enable', 'disable', 'show', 'hide', 'layer', 'layers', 'the']
    const words = layerName.split(' ')
    
    // Filter out command keywords but keep the rest
    const filteredWords = words.filter(word => {
      const lowerWord = word.toLowerCase()
      return !keywords.includes(lowerWord)
    })
    
    layerName = filteredWords.join(' ').trim()

    // Check for "all" keyword - enable/disable all layers
    if (layerName.toLowerCase() === 'all') {
      let count = 0
      map.layers.forEach((layer: __esri.Layer) => {
        layer.visible = visible
        count++
      })
      const action = visible ? 'enabled' : 'disabled'
      const emoji = visible ? '✅' : '❌'
      addBotMessage(`${emoji} All ${count} layers have been ${action}.`)
      return
    }

    if (!layerName) {
      const action = visible ? 'enable' : 'disable'
      addBotMessage(`Please specify a layer name. Example: "${action} ${map.layers.getItemAt(0)?.title || 'layer name'}"\nType "list layers" to see available layers.`)
      return
    }

    // Find matching layers (case insensitive search)
    const matchingLayers = []
    const lowerLayerName = layerName.toLowerCase()
    
    map.layers.forEach((layer: __esri.Layer) => {
      if (layer.title && layer.title.toLowerCase().includes(lowerLayerName)) {
        matchingLayers.push(layer)
      }
    })

    if (matchingLayers.length === 0) {
      addBotMessage(`❌ No layers found matching "${layerName}". Type "list layers" to see all available layers.`)
      return
    }

    // Update visibility for matching layers
    matchingLayers.forEach((layer: __esri.Layer) => {
      layer.visible = visible
    })

    const action = visible ? 'enabled' : 'disabled'
    const emoji = visible ? '✅' : '❌'
    if (matchingLayers.length === 1) {
      addBotMessage(`${emoji} Layer "${matchingLayers[0].title}" has been ${action}.`)
    } else {
      const layerNames = matchingLayers.map((l: __esri.Layer) => l.title).join(', ')
      addBotMessage(`${emoji} ${matchingLayers.length} layers ${action}: ${layerNames}`)
    }
  }

  const listAllLayers = () => {
    const view = jimuMapView.view
    const map = view.map
    
    if (!map || !map.layers || map.layers.length === 0) {
      addBotMessage('No layers found in the map.')
      return
    }

    let layerList = '📋 Available Layers:\n\n'
    map.layers.forEach((layer: __esri.Layer, index: number) => {
      const status = layer.visible ? '✅ ON' : '❌ OFF'
      layerList += `${index + 1}. ${layer.title || 'Unnamed Layer'} ${status}\n`
    })

    layerList += '\nUse "enable [layer name]" or "disable [layer name]" to control layers.'
    addBotMessage(layerList)
  }

  const handleNavigateToLocation = async (command: string) => {
    try {
      // Extract location from command
      let location = command.trim()
      
      // Remove navigation keywords to get the location
      const keywords = ['zoom to', 'navigate to', 'go to', 'find', 'locate']
      keywords.forEach(keyword => {
        const regex = new RegExp(keyword, 'gi')
        location = location.replace(regex, '').trim()
      })

      if (!location) {
        addBotMessage('Please specify a location, address, or postcode. Example: "zoom to Cardiff CF10 1BH"')
        return
      }

      addBotMessage(`🔍 Searching for "${location}"...`)

      const [locator] = await loadArcGISJSAPIModules(['esri/rest/locator'])

      const geocodeUrl = 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer'
      
      const result = await locator.addressToLocations(geocodeUrl, {
        address: { SingleLine: location },
        maxLocations: 1,
        countryCode: 'GB' // Focus on UK/Wales
      })

      if (result && result.length > 0) {
        const firstResult = result[0]
        const point = firstResult.location
        
        // Zoom to the location with appropriate scale
        await jimuMapView.view.goTo({
          target: point,
          zoom: 15
        })

        const matchedAddress = firstResult.address || location
        addBotMessage(`✅ Navigated to: ${matchedAddress}`)
      } else {
        addBotMessage(`❌ Could not find location: "${location}". Please try a different address or postcode.`)
      }
    } catch (error) {
      addBotMessage(`❌ Error navigating to location: ${error?.message || 'Unknown error'}`)
      console.error('Navigation error:', error)
    }
  }

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return

    addUserMessage(currentMessage)
    parseCommand(currentMessage)
    setCurrentMessage('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const mapWidgetId = props.useMapWidgetIds?.[0]

  const handleClose = () => {
    setIsOpen(false)
    setIsMinimized(false)
    setMessages([initialMessage])
    setCurrentMessage('')
    setShowPrintTemplates(false)
    setConversationContext({}) // Clear conversation history on close
  }

  const handleMinimize = () => {
    setIsMinimized(true)
  }

  const handleOpen = () => {
    setIsOpen(true)
    setIsMinimized(false)
  }

  return (
    <div css={{
      position: 'relative',
      width: '100%',
      height: '100%'
    }}>
      {/* Floating Chat Button - Shows when closed or minimized */}
      {(!isOpen || isMinimized) && (
        <button
          onClick={handleOpen}
          css={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: '#0079c1',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0, 121, 193, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            zIndex: 1000,
            '&:hover': {
              backgroundColor: '#005a87',
              transform: 'scale(1.1)',
              boxShadow: '0 6px 16px rgba(0, 121, 193, 0.6)'
            }
          }}
          title="Open Chat"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="8" width="12" height="10" rx="2" fill="white" />
            <circle cx="12" cy="5" r="1.5" fill="white" />
            <line x1="12" y1="6.5" x2="12" y2="8" stroke="white" strokeWidth="1.5" />
            <circle cx="9" cy="12" r="1.5" fill="#0079c1" />
            <circle cx="15" cy="12" r="1.5" fill="#0079c1" />
            <path d="M 9 15 Q 12 16 15 15" stroke="#0079c1" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>
        </button>
      )}

      {/* Chat Window - Shows when open and not minimized */}
      {isOpen && !isMinimized && (
        <div css={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '380px',
          height: '550px',
          backgroundColor: '#fff',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          zIndex: 1000
        }}>
          {/* Header */}
          <div css={{
            backgroundColor: '#0079c1',
            color: '#fff',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px'
          }}>
            <div css={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="6" y="8" width="12" height="10" rx="2" fill="white" />
                <circle cx="12" cy="5" r="1.5" fill="white" />
                <line x1="12" y1="6.5" x2="12" y2="8" stroke="white" strokeWidth="1.5" />
                <circle cx="9" cy="12" r="1.5" fill="#0079c1" />
                <circle cx="15" cy="12" r="1.5" fill="#0079c1" />
                <path d="M 9 15 Q 12 16 15 15" stroke="#0079c1" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </svg>
              <h3 css={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>Map Chatbot</h3>
            </div>
            <div css={{ display: 'flex', gap: '8px' }}>
              {/* Minimize Button */}
              <button
                onClick={handleMinimize}
                css={{
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '20px',
                  lineHeight: '1',
                  transition: 'background 0.2s',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)'
                  }
                }}
                title="Minimize"
              >
                −
              </button>
              {/* Close Button */}
              <button
                onClick={handleClose}
                css={{
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '20px',
                  lineHeight: '1',
                  transition: 'background 0.2s',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)'
                  }
                }}
                title="Close"
              >
                ×
              </button>
            </div>
          </div>

      {/* Messages Container */}
      <div css={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px',
        backgroundColor: '#f5f5f5'
      }}>
        {messages.map(message => (
          <div
            key={message.id}
            css={{
              marginBottom: '12px',
              display: 'flex',
              justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
            }}
          >
            <div css={{
              maxWidth: '70%',
              padding: '10px 14px',
              borderRadius: '12px',
              backgroundColor: message.sender === 'user' ? '#0079c1' : '#fff',
              color: message.sender === 'user' ? '#fff' : '#333',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word'
            }}>
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Print Templates Selection Dialog */}
      {showPrintTemplates && (
        <div css={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div css={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            padding: '24px',
            maxWidth: '400px',
            width: '90%',
            maxHeight: '70vh',
            overflowY: 'auto',
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
          }}>
            <h3 css={{
              margin: '0 0 16px 0',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#333'
            }}>
              Select Print Template
            </h3>
            <p css={{
              margin: '0 0 16px 0',
              fontSize: '14px',
              color: '#666'
            }}>
              Choose a template for your map print:
            </p>
            
            {isLoadingTemplates ? (
              <div css={{
                textAlign: 'center',
                padding: '20px',
                color: '#666'
              }}>
                Loading templates...
              </div>
            ) : (
              <div css={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                {printTemplates.map((template, index) => (
                  <button
                    key={index}
                    onClick={() => { handleTemplateSelection(template) }}
                    css={{
                      padding: '12px 16px',
                      backgroundColor: '#f5f5f5',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      textAlign: 'left',
                      transition: 'all 0.2s',
                      '&:hover': {
                        backgroundColor: '#0079c1',
                        color: '#fff',
                        borderColor: '#0079c1'
                      }
                    }}
                  >
                    {template}
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={() => { setShowPrintTemplates(false) }}
              css={{
                marginTop: '16px',
                padding: '10px 16px',
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                width: '100%',
                '&:hover': {
                  backgroundColor: '#f5f5f5'
                }
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div css={{
        padding: '16px',
        borderTop: '1px solid #e0e0e0',
        backgroundColor: '#fff',
        display: 'flex',
        gap: '8px'
      }}>
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => { setCurrentMessage(e.target.value) }}
          onKeyPress={handleKeyPress}
          placeholder="Type a command (e.g., 'zoom in')..."
          css={{
            flex: 1,
            padding: '10px 12px',
            border: '1px solid #ccc',
            borderRadius: '20px',
            outline: 'none',
            fontSize: '14px',
            '&:focus': {
              borderColor: '#0079c1'
            }
          }}
          disabled={!mapWidgetId}
        />
        <button
          onClick={handleSendMessage}
          disabled={!currentMessage.trim() || !mapWidgetId}
          css={{
            padding: '10px 20px',
            backgroundColor: '#0079c1',
            color: '#fff',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            transition: 'background-color 0.2s',
            '&:hover:not(:disabled)': {
              backgroundColor: '#005a87'
            },
            '&:disabled': {
              backgroundColor: '#ccc',
              cursor: 'not-allowed'
            }
          }}
        >
          Send
        </button>
      </div>

      {/* Map Connection Notice */}
      {!mapWidgetId && (
        <div css={{
          padding: '12px',
          backgroundColor: '#fff3cd',
          color: '#856404',
          textAlign: 'center',
          fontSize: '12px',
          borderTop: '1px solid #ffc107'
        }}>
          Please configure a map widget in settings
        </div>
      )}
        </div>
      )}

      {/* Hidden Map View Component */}
      {mapWidgetId && (
        <JimuMapViewComponent
          useMapWidgetId={mapWidgetId}
          onActiveViewChange={onActiveViewChange}
        />
      )}
    </div>
  )
}

export default Widget
