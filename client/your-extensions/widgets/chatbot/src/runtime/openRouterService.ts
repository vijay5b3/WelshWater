/**
 * OpenRouter AI Service
 * Handles all AI-powered features using OpenRouter API
 */

export interface OpenRouterConfig {
  apiKey: string
  model: string
  baseUrl?: string
  maxTokens?: number
  temperature?: number
}

export interface AIIntent {
  type: 'spatial_query' | 'attribute_query' | 'analysis' | 'routing' | 'comparison' | 'translation' | 'unknown'
  action: string
  parameters: {
    layers?: string[]
    location?: string
    distance?: number
    criteria?: string[]
    fromLocation?: string
    toLocation?: string
    bufferDistance?: number
    compareAttributes?: string[]
    language?: string
    schoolCode?: string
    schoolName?: string
    town?: string
    postcode?: string
    locality?: string
    status?: string
    gender?: string
    type?: string
  }
  originalQuery: string
  confidence: number
}

export class OpenRouterService {
  private readonly config: OpenRouterConfig

  constructor(config: OpenRouterConfig) {
    this.config = {
      baseUrl: 'https://openrouter.ai/api/v1',
      maxTokens: 6000,
      temperature: 0.3,
      ...config
    }
  }

  /**
   * Parse natural language query into structured intent
   */
  async parseIntent(query: string): Promise<AIIntent> {
    const systemPrompt = `You are a GIS assistant helping with Welsh government data layers:
1. NRW_MAIN_RIVERS (rivers in Wales)
2. NRW_NATIONAL_PARK (national parks)
3. state_secondary_schools_wales (secondary schools) - Has fields: school_cod, name, language, iaith, street_des, town_name, locality, postcode, status, gender, type
4. Areas_Affecting_Bathing_Waters (bathing water quality areas)
5. localauthorities (local authority boundaries)

Parse the user's query into structured intent. Focus on:
- POSTCODE matching: "schools in CF10", "schools with postcode SA1"
- TOWN/CITY matching: "schools in Cardiff", "schools around Swansea"
- NAME matching: "schools with name Cardiff", "find school named"
- LANGUAGE matching: "Welsh medium schools", "bilingual schools"
- CODE matching: "school code 6604025"

DO NOT use distance-based queries. Use location-based matching instead.

Examples:
- "school code 6604025" → action: "find_by_code", parameters: {"schoolCode": "6604025"}
- "schools in Cardiff" → action: "query_by_attribute", parameters: {"town": "Cardiff"}
- "schools with postcode CF10" → action: "query_by_attribute", parameters: {"postcode": "CF10"}
- "schools near Cardiff" → action: "query_by_attribute", parameters: {"town": "Cardiff"}
- "Welsh medium schools in Swansea" → action: "query_by_attribute", parameters: {"language": "Welsh", "town": "Swansea"}
- "schools around Newport" → action: "query_by_attribute", parameters: {"town": "Newport"}

Respond ONLY with valid JSON. No additional text.`

    try {
      const response = await fetch(`${this.config.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'ArcGIS Chatbot'
        },
        body: JSON.stringify({
          model: this.config.model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Parse this query: "${query}"

FOCUS ON LOCATION MATCHING, NOT DISTANCE!

Return JSON like:
{
  "type": "attribute_query",
  "action": "query_by_attribute",
  "parameters": {
    "schoolCode": "6604025",    // if querying by code
    "schoolName": "Cardiff",    // if querying by name pattern
    "language": "Welsh",        // if querying by language (Welsh/English/Bilingual)
    "town": "Cardiff",          // if querying by town/city
    "postcode": "CF10",         // if querying by postcode (partial match)
    "locality": "Swansea",      // if querying by locality
    "status": "Open",           // if querying by status
    "gender": "Mixed",          // if querying by gender
    "type": "Community School"  // if querying by school type
  },
  "confidence": 0.9
}

For "schools near X" or "schools around X" or "schools in X" → use town parameter with location name.` }
          ],
          max_tokens: 500,
          temperature: 0.3
        })
      })

      if (!response.ok) {
        throw new Error(`OpenRouter API error: ${response.statusText}`)
      }

      const data = await response.json()
      const content = data.choices[0].message.content

      // Try to extract JSON from response
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const intent = JSON.parse(jsonMatch[0])
        return {
          ...intent,
          originalQuery: query
        }
      }

      // Fallback if no JSON found
      return {
        type: 'unknown',
        action: 'unclear',
        parameters: {},
        originalQuery: query,
        confidence: 0
      }
    } catch (error) {
      console.error('Error parsing intent:', error)
      return {
        type: 'unknown',
        action: 'error',
        parameters: {},
        originalQuery: query,
        confidence: 0
      }
    }
  }

  /**
   * Generate natural language response from query results
   */
  async generateResponse(query: string, results: any): Promise<string> {
    const systemPrompt = `You are a helpful GIS assistant for Welsh government data. 
Generate a clear, concise response in natural language.
Include specific numbers, locations, and actionable insights.
Be friendly and informative.`

    try {
      const response = await fetch(`${this.config.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'ArcGIS Chatbot'
        },
        body: JSON.stringify({
          model: this.config.model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `User asked: "${query}"

Query results: ${JSON.stringify(results, null, 2)}

Generate a friendly, informative response (2-3 sentences max):` }
          ],
          max_tokens: 300,
          temperature: 0.7
        })
      })

      if (!response.ok) {
        throw new Error(`OpenRouter API error: ${response.statusText}`)
      }

      const data = await response.json()
      return data.choices[0].message.content.trim()
    } catch (error) {
      console.error('Error generating response:', error)
      return `Found ${results.count || 0} results for your query.`
    }
  }

  /**
   * Translate Welsh to English
   */
  async translateWelsh(text: string): Promise<string> {
    try {
      const response = await fetch(`${this.config.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'ArcGIS Chatbot'
        },
        body: JSON.stringify({
          model: this.config.model,
          messages: [
            { role: 'system', content: 'You are a Welsh to English translator. Translate ONLY the text, no explanations.' },
            { role: 'user', content: `Translate this Welsh text to English: "${text}"` }
          ],
          max_tokens: 200,
          temperature: 0.3
        })
      })

      if (!response.ok) {
        throw new Error(`OpenRouter API error: ${response.statusText}`)
      }

      const data = await response.json()
      return data.choices[0].message.content.trim()
    } catch (error) {
      console.error('Error translating Welsh:', error)
      return text // Return original if translation fails
    }
  }

  /**
   * Get AI suggestions for analysis based on visible data
   */
  async suggestAnalysis(layersInfo: any[]): Promise<string[]> {
    const systemPrompt = `You are a GIS analyst. Based on visible map layers, suggest 3 interesting spatial analyses.
Be specific and actionable. Each suggestion should be a question users can ask.`

    try {
      const response = await fetch(`${this.config.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'ArcGIS Chatbot'
        },
        body: JSON.stringify({
          model: this.config.model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Visible layers: ${layersInfo.map(l => l.title).join(', ')}

Suggest 3 analysis questions. Format as JSON array:
["Question 1", "Question 2", "Question 3"]` }
          ],
          max_tokens: 300,
          temperature: 0.7
        })
      })

      if (!response.ok) {
        throw new Error(`OpenRouter API error: ${response.statusText}`)
      }

      const data = await response.json()
      const content = data.choices[0].message.content

      // Try to parse JSON array
      const jsonMatch = content.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }

      // Fallback: split by newlines
      return content.split('\n').filter((line: string) => line.trim()).slice(0, 3)
    } catch (error) {
      console.error('Error getting suggestions:', error)
      return [
        'Find schools near rivers',
        'Show bathing waters in national parks',
        'Compare school density by local authority'
      ]
    }
  }
}
