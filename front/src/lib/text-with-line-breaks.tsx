import { memo } from 'react'

export const TextWithLineBreaks = memo(({ text }: { text: string }) => {
  return (
    <div>
      {text.split('\n').map((line, index) => (
        <div key={index}>
          {line}
          <br />
        </div>
      ))}
    </div>
  )
})

TextWithLineBreaks.displayName = 'TextWithLineBreaks'
