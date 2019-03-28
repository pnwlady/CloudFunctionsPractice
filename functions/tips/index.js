//Global (instance-wide) scope
//This computation runs at instance cold-start
const instanceVar = heavyComputation();

/**
 * HTTP function that declares a variable.
 *
 * @param {Object} req request context.
 * @param {Object} res response context.
 */

 exports.scope = (req, res) => {
     // Per-function scope
     //This computations runs everytime this function is called
     const functionVar = lightComputation();
     res.send(`Per instance: ${instanceVar}, per function: ${functionVar}`);
 }