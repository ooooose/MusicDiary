export const TextWithLineBreaks = ({ text }: { text: string }) => {
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
}
