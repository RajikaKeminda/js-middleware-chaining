class Express {

    req() {
      return { body: {} }
    }
  
    res() {
      return { send: (param) => { console.log('sent request', param) } }
    }
  
    route(...rest) {
      let nextIndex = 0
      let lastIndex = rest.length;
      let next = () => {
        nextIndex++;
        if (nextIndex <= lastIndex) {
          let cb = rest[nextIndex]
          cb(this.req, this.res, next)
        }
      }
  
      if (lastIndex > 0) {
        let cb = rest[0];
        cb(this.req, this.res, next)
      }
    }
  }
  
  let app = new Express()
  
  app.route((req, res, next) => {
    console.log('text')
    next()
  }, (req, res, next) => {
    console.log('text2')
  })