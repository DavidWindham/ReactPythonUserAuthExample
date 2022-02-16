import React, {useState, useEffect} from 'react'
import ClientMessageComponent from './messages/client_message'
import NonClientMessageComponent from './messages/non_client_message'


export default function MessageParentComponent(props:any) {
  const [formattedDate, setFormattedDate] = useState<string>()

  useEffect(() => {
    const locDate = new Date(props.message.timestamp)
    const formattedTimestampString = getFormattedTimestamp(locDate)
    setFormattedDate(formattedTimestampString)
    console.log(locDate, formattedDate, formattedTimestampString)
  }, [])

  function getFormattedTimestamp(date:Date) {
    return date.toLocaleDateString(navigator.language, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
  }

  return (
    (props.owner === true ?
        <div>
          <ClientMessageComponent message={props.message}
            timestamp={formattedDate}
          />
        </div>:
        <div>
          <NonClientMessageComponent message={props.message}
            timestamp={formattedDate}
          />
        </div>
    )
  )
}
