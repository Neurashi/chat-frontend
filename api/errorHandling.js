// function returnError(errorMsg){
//     const errorResponse = JSON.parse(errorMsg);
//     const errorMessage = errorResponse.message;
//     const errorStatus = errorResponse.status;
//     return {
//         message: errorMessage,
//         status: errorStatus
//     }
// }
function returnError(errorMsg) {

    let errorResponse;
    
    try {
      errorResponse = JSON.parse(errorMsg); 
    } catch (e) {
      // Not JSON, check for 401
      if (errorMsg.includes('401 Unauthorized')) {
        return {
          message: 'Unauthorized', 
          status: 401
        };
      } else {
        return {
          message: 'something went wrong', 
          status: 500
        };
      }
    }
  
    const errorMessage = errorResponse.message;
    const errorStatus = errorResponse.status;
    
    return {
      message: errorMessage, 
      status: errorStatus
    };
  
  }