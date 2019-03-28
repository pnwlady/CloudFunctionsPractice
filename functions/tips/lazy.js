//This is an example of lazy initialization of global variables - it would go in the index.js 
// Always initialized (at cold start)
const nonLazyGlobal = fileWideComputation();

// Declared at cold-start, but only initialized if/when the function exectures
let lazyGlobal;

/**
 * HTTP function that uses lazy-initialized globals
 *
 * @param {Object} req request context.
 * @param {Object} res response context.
 */
export.lazyGlobals = (req, res) => {
    // This value is initialized on lif (and when) the function is called
    lazyGlobal = lazyGlobal || functionSpecificComputation();

    res.send(`Lazy global: ${lazyGlobal}, non-lazy global: ${nonLazyGlobal}`);
}