import React from 'react'

const debug_message = (msg) => {
    let debug_div = document.querySelector("#debug")
    if (!debug_div)
      return
    debug_div.innerHTML = msg + '<br\>' + debug_div.innerHTML
}

export default debug_message
