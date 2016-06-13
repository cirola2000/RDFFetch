

function checkPattern(pattern, format, normalizedFormat, callback) {

	var formats = format.split(pattern);

	if (formats.length > 0)
		callback(normalizedFormat);

}


function getNormalizedFormat(format, callback) {
 
	/* Check for RDFXML format */

	// checkPattern(/rdf/i, format, "rdfxml", function (f) {
	// 	callback(f);
	// });

// console.log(" - "+format)

	var formats = format.split(/rdf/i);

	if (formats.length > 1)
		return callback("rdfxml");

	
	
	/* Check for turtle format */
	
	formats = format.split(/ttl/i);

	if (formats.length > 1)
		return callback("ttl");
		
	formats = format.split(/turtle/i);

	if (formats.length > 1)
		return callback("ttl");
		
	formats = format.split(/dcat/i);

	if (formats.length > 1)
		return callback("ttl");
		
	formats = format.split(/void/i);

	if (formats.length > 1)
		return callback("ttl");
		


	// /* Check for trig format */

	formats = format.split(/trig/i);

	if (formats.length > 1)
		return callback("trig");
		
	
	// /* Check for sparql format */
	
		formats = format.split(/arql/i);

	if (formats.length > 1)
		return callback("sparql");
	 

	// /* Check for nq format */
	
	
	formats = format.split(/nq/i);

	if (formats.length > 1)
		return callback("nq")
		
		
	formats = format.split(/nquad/i);

	if (formats.length > 1)
		return callback("nq")
		
		
	formats = format.split(/n-quad/i);

	if (formats.length > 1)
		return callback("nq")
		
	
	// /* Check for nt format */
	
	formats = format.split(/nt/i);

	if (formats.length > 1 && formats[0].length<3)
		return callback("nt")

	formats = format.split(/n-triple/i);

	if (formats.length > 1)
		return callback("nt")

	formats = format.split(/ntriple/i);

	if (formats.length > 1)
		return callback("nt")
		
		
	// /* Check for n3 format */
	formats = format.split(/n3/i);

	if (formats.length > 1)
		return callback("n3")
		

	// /* Check for =owl format */

	formats = format.split(/owl/i);

	if (formats.length > 1)
		return callback("owl")
		
	callback("");
}


module.exports = getNormalizedFormat;
