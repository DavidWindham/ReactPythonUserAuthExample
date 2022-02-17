import React, {useState, useEffect} from 'react'
import MessageComponent from './messages/message'


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
          <MessageComponent message={props.message}
            userMessage={`${formattedDate} - You`}
            messagePosition='right'
          />
        </div>:
        <div>
          <MessageComponent message={props.message}
            userMessage={`${props.message.username} - ${formattedDate}`}
            messagePosition='left'
          />
        </div>
    )
  )
}
