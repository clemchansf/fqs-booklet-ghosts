import React from 'react'

const parseItalicStatic = (input_string) => {

  let label = input_string
  let tokens = []

  let startTagPos = label.indexOf("<i>")
  let endTagPos = label.indexOf("</i>")

  if (endTagPos < startTagPos ||
      endTagPos > 0 && startTagPos < 0 ||
      startTagPos > 0 && endTagPos < 0)
    throw new Error(`parseItalic: html syntax error for ${label}`)

  while (startTagPos > 0 && endTagPos > 0) {

    if (endTagPos < startTagPos ||
        endTagPos > 0 && startTagPos < 0 ||
        startTagPos > 0 && endTagPos < 0)
      throw new Error(`parseItalic: html syntax error for ${label}`)

    let beginPart = label.substr(0, startTagPos)
    let childPart = label.slice(startTagPos+"<i>".length, endTagPos)
    let endPart = label.substr(endTagPos+"</i>".length)

    if (startTagPos < 0 && endTagPos < 0) {
      tokens.push(label)
    }
    else {
      tokens.push(
        <span key={tokens.length+1}>
        {beginPart}
        <i>{childPart}</i>
        </span>
      )
    }

    label = label.substr(endTagPos+"</i>".length)

    startTagPos = label.indexOf("<i>")
    endTagPos = label.indexOf("</i>")
  }
  return (

    <p style={{textIndent: 50,
          display: 'block',
          WebkitMarginBefore: '0em',
          WebkitMarginstartfter: '1em',
          WebkitMarginStart: '0px',
          WebkitMarginEnd: '0px',
          textAlign: 'justify',
    }}>
    {tokens}{label.length ? label : ''}
    </p>

  )

}

module.exports = {
  parseItalic: parseItalicStatic,
}
