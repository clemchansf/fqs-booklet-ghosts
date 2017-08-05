import React, {Component} from 'react'

export default class extends Component {

    constructor(props) {
        super(props);
        this.state =  {style: {}}
        this.state = {...this.state, ...props}
        this.state.style.textAlign = props.options.textAlign || 'left'
        this.state.style.fontSize = props.options.fontSize || 22
        this.state.minBoundary = props.options.minBoundary || 12
        this.state.maxBoundary = props.options.maxBoundary || 39
        this.state.skipFactor = props.options.skipFactor || 50

        // internal variables
        this.state.sizing = false
        this.state.lastRecordedDistance = 0
        this.state.timers = []
    }

    pinchStart = (e) => {

        if (e.touches.length===2) {
            this.setState({sizing:true})
        }
    }

    pinchMove = (event) => {

        if (this.state.sizing) {
          let square = (x) => x * x
          let distance = square(event.touches[0].pageX-event.touches[1].pageX)
                        +square(event.touches[0].pageY-event.touches[1].pageY)


          let inc = (x) => {
              if (x < this.state.maxBoundary)
                this.setState({style: {fontSize:  this.state.style.fontSize + 1}})
              let callbackObj = this.state.onPinchMove || null
              if (callbackObj && typeof callbackObj === "object") {
                if (callbackObj.fontSize && typeof callbackObj.fontSize == "function") {
                  callbackObj.fontSize(this.state.style.fontSize)
                }
              }
          }
          let dec = (x) => {
              if (x > this.state.minBoundary)
                this.setState({style:{fontSize: this.state.style.fontSize - 1}})
              let callbackObj = this.state.onPinchMove || null
              if (callbackObj && typeof callbackObj === "object") {
                if (callbackObj.fontSize && typeof callbackObj.fontSize == "function") {
                  callbackObj.fontSize(this.state.style.fontSize)
                }
              }
          }

          if  (this.state.lastRecordedDistance === 0) {

              this.setState({lastRecordedDistance:distance})

          } else {

              let e = Object.assign({}, event);
              let self = this

              let timer = setTimeout(() => {

                  let delta =  distance - self.state.lastRecordedDistance;

                  if (delta > 0) {
                    inc(self.state.style.fontSize)
                  }

                  if (delta < 0) {
                    dec(self.state.style.fontSize)
                  }

              }, this.state.skipFactor);

              this.setState({timers: [...this.state.timers,timer]})
          }
        }
    }
    pinchEnd = (e) => {

        if (this.state.sizing) {
            this.setState({lastRecordedDistance: 0, sizing: false});
            this.state.timers.forEach((timer) => clearTimeout(timer))
            let callbackObj = this.state.onPinchEnd || null
            if (callbackObj && typeof callbackObj === "object") {
              if (callbackObj.fontSize && typeof callbackObj.fontSize == "function") {
                callbackObj.fontSize(this.state.style.fontSize)
              }
            }
        }
    }
    render() {
      /*
       * var : wrappingBoundaryForPageTag
       *   sets the boundary for children paragraphs to wrap, otherwise
       *   text will overflow and be hidden by the browser
       */
       let wrappingBoundaryForPageTag = window.innerWidth

       return (

        <div
          style={Object.assign({},this.state.style, {width: wrappingBoundaryForPageTag})}
          onTouchStart={this.pinchStart.bind(this)}
          onTouchMove={this.pinchMove.bind(this)}
          onTouchEnd={this.pinchEnd.bind(this)}
        >
          {this.props.children}
        </div>
      )
    }
}
