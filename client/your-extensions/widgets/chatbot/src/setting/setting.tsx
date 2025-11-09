/** @jsx jsx */
import { React, jsx } from 'jimu-core'
import type { AllWidgetSettingProps } from 'jimu-for-builder'
import { MapWidgetSelector } from 'jimu-ui/advanced/setting-components'
import { TextInput } from 'jimu-ui'
import type { IMConfig } from '../config'

const Setting = (props: AllWidgetSettingProps<IMConfig>) => {
  const onMapWidgetSelected = (useMapWidgetIds: string[]) => {
    props.onSettingChange({
      id: props.id,
      useMapWidgetIds: useMapWidgetIds
    })
  }

  const onApiKeyChange = (value: string) => {
    // When API key is set, also set default model if not already set
    let newConfig = props.config.set('openRouterApiKey', value)
    if (value && !props.config?.openRouterModel) {
      newConfig = newConfig.set('openRouterModel', 'mistralai/mistral-7b-instruct')
    }
    
    props.onSettingChange({
      id: props.id,
      config: newConfig
    })
  }

  const onModelChange = (value: string) => {
    props.onSettingChange({
      id: props.id,
      config: props.config.set('openRouterModel', value)
    })
  }

  return (
    <div className="chatbot-widget-setting" css={{
      padding: '20px'
    }}>
      <div css={{
        marginBottom: '16px'
      }}>
        <h5 css={{
          fontSize: '16px',
          fontWeight: 'bold',
          marginBottom: '8px',
          color: '#333'
        }}>
          Map Widget Configuration
        </h5>
        <p css={{
          fontSize: '14px',
          color: '#666',
          marginBottom: '12px'
        }}>
          Select the map widget that this chatbot will control.
        </p>
      </div>

      <div css={{
        marginBottom: '16px'
      }}>
        <label css={{
          display: 'block',
          marginBottom: '8px',
          fontSize: '14px',
          fontWeight: '500',
          color: '#333'
        }}>
          Select Map Widget:
        </label>
        <MapWidgetSelector
          useMapWidgetIds={props.useMapWidgetIds}
          onSelect={onMapWidgetSelected}
        />
      </div>

      {/* AI Configuration */}
      <div css={{
        marginTop: '24px',
        paddingTop: '24px',
        borderTop: '1px solid #ddd'
      }}>
        <h5 css={{
          fontSize: '16px',
          fontWeight: 'bold',
          marginBottom: '8px',
          color: '#333'
        }}>
          🤖 AI Features (OpenRouter)
        </h5>
        <p css={{
          fontSize: '14px',
          color: '#666',
          marginBottom: '12px'
        }}>
          Enable advanced AI features using OpenRouter API
        </p>

        <div css={{
          marginBottom: '16px'
        }}>
          <label css={{
            display: 'block',
            marginBottom: '8px',
            fontSize: '14px',
            fontWeight: '500',
            color: '#333'
          }}>
            OpenRouter API Key:
          </label>
          <TextInput
            type="password"
            value={props.config?.openRouterApiKey || ''}
            onChange={(e) => { onApiKeyChange(e.target.value) }}
            placeholder="sk-or-v1-..."
            css={{
              width: '100%'
            }}
          />
          <small css={{
            display: 'block',
            marginTop: '4px',
            fontSize: '12px',
            color: '#666'
          }}>
            Get your API key from <a href="https://openrouter.ai" target="_blank" rel="noopener noreferrer">openrouter.ai</a>
          </small>
        </div>

        <div css={{
          marginBottom: '16px'
        }}>
          <label css={{
            display: 'block',
            marginBottom: '8px',
            fontSize: '14px',
            fontWeight: '500',
            color: '#333'
          }}>
            AI Model:
          </label>
          <TextInput
            value={props.config?.openRouterModel || ''}
            defaultValue="mistralai/mistral-7b-instruct"
            onChange={(e) => { onModelChange(e.target.value) }}
            placeholder="mistralai/mistral-7b-instruct"
            css={{
              width: '100%'
            }}
          />
          <small css={{
            display: 'block',
            marginTop: '4px',
            fontSize: '12px',
            color: '#666'
          }}>
            Recommended: mistralai/mistral-7b-instruct (fast & affordable)
          </small>
        </div>
      </div>

      <div css={{
        marginTop: '24px',
        padding: '12px',
        backgroundColor: '#e3f2fd',
        borderRadius: '4px',
        fontSize: '13px',
        color: '#1565c0'
      }}>
        <strong>✨ AI-Powered Commands:</strong>
        <ul css={{
          marginTop: '8px',
          paddingLeft: '20px'
        }}>
          <li>Find schools near rivers in Cardiff</li>
          <li>Show bathing waters within 1km of national parks</li>
          <li>Which local authorities have most schools?</li>
          <li>Plan a field trip route from Swansea to Snowdonia</li>
          <li>Analyze flood risk for schools near rivers</li>
        </ul>
      </div>

      <div css={{
        marginTop: '16px',
        padding: '12px',
        backgroundColor: '#f5f5f5',
        borderRadius: '4px',
        fontSize: '13px',
        color: '#666'
      }}>
        <strong>Basic Commands (No AI needed):</strong>
        <ul css={{
          marginTop: '8px',
          paddingLeft: '20px'
        }}>
          <li><strong>Zoom:</strong> zoom in, zoom out, zoom to level [N]</li>
          <li><strong>Print:</strong> print, print map, give print</li>
          <li><strong>Layers:</strong> list layers, enable [name], disable [name]</li>
          <li><strong>Info:</strong> current zoom, help</li>
        </ul>
      </div>
    </div>
  )
}

export default Setting
