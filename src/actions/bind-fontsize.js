 import cfg from '../defaults/config.js'

/* 
	prevent fontSize to be too large or too small for Material-UI Drawer Menu to render
	properly
*/
const bindFontSize = (size) => {
	if (size >= cfg.minMenuFontSize && (size < cfg.maxMenuFontSize))
		return size
	else if (size < cfg.minMenuFontSize)
		return cfg.minMenuFontSize
	else 
	  	return cfg.maxMenuFontSize
}

export default bindFontSize