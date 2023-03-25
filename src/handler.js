const { nanoid } = require('nanoid');
const { postCaptionToDatabase, getCaptionFromDatabase, deleteCaptions} = require('./service');


const postCaptionHandler = async (request, h) => {
  try {
    const { author = 'unknow', caption = 'kosong' } = request.payload;
    
    const cid = `capt-${+new Date()}-${nanoid(9)}`;
    
    await postCaptionToDatabase(cid, author, caption);
    
    const response = h.response({
      status: 'success',
      message: 'caption added successfully',
    });
    response.code(201);
    return response;
  } catch (error) {
    const response = h.response({
      status: 'fail',
      message: 'an error occurred on the server',
    });
    response.code(500)
    return response;
  }
}

const getCaptionHandler = async (request, h) => {
  try {
    const result = await getCaptionFromDatabase();
    const response = h.response({
      status: 'success',
      message: 'caption from random people',
      data: result,
    });
    response.code(200);
    return response;
  } catch (error) {
    const response = h.response({
      status: 'fail',
      message: 'an error occurred on the server',
    });
    response.code(500);
    return response;
  }
}

const deleteCaptionsHandler = async (request, h) => {
  try {
    await deleteCaptions();
    const response = h.response({
      status: 'success',
      message: 'captions removed successfully',
    });
    response.code(200);
    return response;
  } catch (error) {
    const response = h.response({
      status: 'fail',
      message: 'an error occurred on the server',
    });
    response.code(500);
    return response;
  }
}

module.exports = { postCaptionHandler, getCaptionHandler, deleteCaptionsHandler }