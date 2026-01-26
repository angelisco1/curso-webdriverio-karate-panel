(function(){
  const generateRandomId = () => {
    return Math.floor(Math.random() * 100) + 1
  }

  return {
    generateRandomId
  }
})()