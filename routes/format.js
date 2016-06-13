var express = require('express');
var async = require("async");
var request = require('request');
var mongoose = require('mongoose');
// var validator = require('normalized');
var router = express.Router();



router.get('/getAll', function (req, res, next) {

  var Resource = mongoose.model("Resource");


  Resource.aggregate([
    {
      $group: {
        _id: "$format"
      }
    }
  ]
    , function (err, docs) {

      docs.forEach(function (doc) {
        console.log(doc._id);
      })

    });
});


router.get('/updateInvalid', function (req, res, next) {

  var formats = [
    '',
    'netcdf',
    'rss',
    'wfs',
    'kml / kmz',
    'gif',
    'app',
    'geopdf',
    'cdec ascii',
    'tiff',
    'cbwfdb',
    'wmv',
    'mp4',
    'spp',
    'imo',
    'sta',
    'tenv3',
    'bmp',
    'out',
    'asc',
    'sgy',
    'gdb',
    'jpg',
    'mpk',
    'ovr',
    'tar',
    'grd',
    'shp',
    'prj',
    'shx',
    'doc',
    'xlsm',
    'h5',
    'vec',
    'xlsx',
    'Picker',
    'tiff world file',
    'Portal',
    'OPENDAP',
    'Excel file',
    'text/x-sh',
    'mpg',
    'Gerber',
    'dwc',
    'nexus',
    'mp3',
    'PPTX',
    'Excel (.xlsx)',
    '7zip',
    'xlxs',
    'PDF, XLSX & XLS',
    'ZIP (PDF)',
    'OData Version 4.0',
    'MapInfo table',
    'sld',
    'Home Page',
    'Map portal',
    'web service',
    'TAB',
    'Zipped XSLX',
    'pdf, csv',
    'excel (xls)',
    'CSV, ZIP',
    'PDF, CSV',
    'CSV, JSON, web services',
    'MB',
    'software',
    'application/x-netcdf',
    'ZIP (CSV)',
    'lis',
    'WMS & WFS',
    'excel (xlsx)',
    'multiple formats',
    'Other',
    'xml',
    'zip:pdf',
    'plain',
    '.docx',
    'wms',
    'website link',
    'XML/ATOM/RSS',
    'R',
    'Aleph sequentials',
    'datapkg/hg',
    'JSON in ZIP',
    'text/plain; charset=utf-8',
    'xml+gzip',
    'torrent',
    'list',
    'OBF',
    'jsonp',
    'application/zip+vnd.ms-excel',
    'TAR',
    'ArcGIS',
    'MOL',
    'PPT, KMZ, DOC',
    'tgz:XML',
    'zip (shp)',
    'Python script',
    'word',
    'html, PC-Axis, other formats for downloading',
    '<a href="http://affari-tuoi-gioco.it/">Affari Tuoi Gioco</a>',
    'mapping',
    'coffee',
    'services/gdocs/spreadsheet',
    'Data File in ACCESS',
    'gps',
    'api/search',
    'ODS Format',
    'html, xml, xml+xslt',
    'flash',
    'bz2:xml',
    'ESRI Shapefiles',
    'gzip:sql',
    'cdr',
    'dbf',
    'Metadata',
    'xls, csv',
    'example/csv',
    'html/xml',
    'application/zip+application/vnd.ms-excel',
    'text/csv',
    'xslx',
    'spss',
    'OpenOffice Calc',
    'application/wsdl+xml',
    '.txt',
    'src-hg/python',
    'Web services',
    'zip:8c',
    'shape, jpg, pdf',
    'trig gzip',
    'python shell script',
    'html',
    'yml',
    'Image (NIFTI)',
    'various',
    'HTML, XML, XML+XSLT',
    'multiple spatial formats',
    'KML',
    'GeoRSS',
    '',
    'rest api',
    'compressed ASCII',
    'gml, shape, html mm.',
    'application/msword',
    'csv, xls m.fl.',
    'any',
    'shp',
    'csv',
    'Data File in STATA and EXCEL',
    'csv and xls',
    'ksh',
    'mat',
    'SOLR',
    'CSV, Stata, Excel',
    'Data File in EXCEL and STATA',
    'CSV (zipped)',
    'custom (index)',
    'Web Form',
    'DXF',
    'xml:txt',
    'ESRI Arc Export',
    'datapkg/git',
    'png',
    'zip:txt',
    'segy',
    'GML',
    'various formats',
    'data file in excel',
    'text',
    'sav',
    'example/api/json',
    'MS Access MDB',
    'zipped text',
    '-',
    'application/zip+text/csv',
    'gda',
    'JAR',
    'Fritzing',
    'dBase',
    'garmin',
    'website',
    'sbobet',
    'application/dbase+dbc',
    'mapping/d2r',
    '.xlxs',
    'image/jpeg',
    'application/ods',
    'csv, stata, excel',
    'fgdb / gdb',
    'Shape file.shp',
    'grafika',
    'http://mindbigdata.com/opendb',
    'rar:shp',
    'sbx',
    'datapkg/src/hg',
    'html, xls, pdf',
    'SDF',
    'XHTML',
    'NetCDF',
    'license-metadata',
    'email',
    'xls, html, pdf',
    'UV FITS',
    'n/a',
    'ATOM',
    'RSS1.0',
    'text/ascii',
    'API',
    'ZIP:XLS',
    'WFS - GML',
    'JSON, XML',
    'zip:json',
    'Plettac',
    'html/json',
    'Rdata',
    'jpeg 2000',
    'gz:text/csv',
    'Sicherungsautomat',
    'api/fct',
    'web',
    'datapackage',
    'xtm',
    'sketch',
    'text/javascript',
    'api/xml',
    'BEACON',
    'HTML5',
    'obf',
    'bin',
    'video/x-msvideo',
    'Stata',
    'link',
    'xsd',
    'Spreadsheet',
    '.tar.gz',
    'sqlite3.x',
    'wsf/gml',
    'Index',
    'feed',
    'shared code',
    'registry of datasets',
    'GIT',
    'url',
    'html5',
    'gzip',
    'PBF',
    'bz2',
    'gtfs-realtime',
    'application/x-bzip2',
    'png jpg',
    'zip:bib',
    'SLD',
    'EPS',
    'ESRI ARC EXPORT',
    'gedcom',
    'tsv.gz',
    'oai-pmh',
    'JSON or XML',
    'sbo',
    'm88',
    'OAI',
    'application/x-thermo-isodat',
    'marcxml',
    'SQLite 3',
    'csv, xls, prn, dBase med flere',
    'ISO-TimeML',
    'html, pdf',
    'HTML, PDF',
    'xls, html, ascii',
    'xls (zip)',
    'sbn',
    'Google doc',
    'application/x-7z-compressed',
    'KML/SHP',
    'WCS',
    'application/x-protobuf',
    'search, view & download data',
    'csv,xml',
    'CSV/SQLite',
    'tar.gz',
    'application/tgz|text/jsondir',
    'application/image',
    'MapInfo TAB',
    'xml, json',
    'Microsoft Access database',
    'Chart',
    'zipped esri file geodatabase',
    'api/xml|json',
    'html/xls',
    'XLM',
    'gis',
    'widget',
    'html',
    'jar',
    'Sqlite',
    'TSV',
    'Web map',
    'bz2:csv',
    'html, xls',
    'python',
    'GDB',
    'example/*',
    'application/unixref+xml',
    'SQL',
    'gz:txt',
    'html-search',
    'application/html',
    'application/x-sharedlib',
    'application/csv',
    'REST/JSON',
    'Google spreadsheet',
    'ibcbet',
    'plain text',
    'application/marc',
    'application/x-gzip',
    'Shape',
    'Microsoft Excel',
    'beacon',
    'google spreadsheet',
    'dtd',
    'GDOCS/Spreadsheet',
    'example/json',
    'KML',
    'mongodb extended json',
    'gz:xml',
    '.png',
    '.json',
    'Application Setup Download',
    'pao',
    'CSV',
    '.sav',
    'rest/xml',
    'googleclone',
    'URI',
    'MARC 21',
    'Google Maps visualization',
    'application/trix',
    'html page',
    'application/rtf',
    'zip:xls',
    'gdocs',
    'edi',
    'OSM',
    'GIF',
    'XML (Current Metro)',
    'SRU',
    'dwg',
    'tgz|tsv',
    'format-xls',
    'googlespreadsheet',
    'RTF',
    'api/json',
    'SPH',
    'xlb',
    'application/x-bzip',
    'git',
    'application/vnd.ms-excel',
    'mysql,csv',
    'mapping/twc-conversion',
    'WYEC2',
    'Website',
    'PDF & XLSX',
    'Google Spreadsheet',
    'ESRI Shape',
    'Data File in ACCESS and SPSS',
    'gdocs/ccc',
    'OL',
    'text/x-sql',
    'WMS',
    'N/A',
    'text/x-osmapping-csv',
    'Fusion Tables',
    'GPX',
    'service/gdocs/ccc',
    'application/x-msdownload; format=pe64',
    'MARCXML',
    'XML (Tomorrow)',
    'PDF / XLS',
    'application/x-xz',
    'ftp site with zipped esri file geodabases',
    'PNG',
    'shape',
    'index/ftp',
    'plain text',
    'text/html; charset=windows-1252',
    'Marc21',
    'TIFF',
    'example/warc',
    'multiple',
    'XML (Current Country)',
    'csv, xls, openoffice, pdf mm',
    'ESRI Grid',
    '.pdf',
    'XLSX',
    'Online human development data',
    'DwC-A',
    'kml',
    'geotif',
    '.topojson',
    '.geojson',
    'application/x-vnd.oasis.opendocument.spreadsheet',
    '.tab',
    'CSV',
    'gdf',
    'MS Acess MDB',
    'application/atom+xml',
    'ecw',
    'google doc',
    'MongoDB Extended JSON',
    'JSON',
    'on-screen text',
    'application/x-msdownload',
    'application/vnd.ms-excel.sheet.binary.macroEnabled.12',
    'ADF',
    'microsoft access database',
    'unknown',
    'Rest API',
    'iso',
    'SVG',
    'gz',
    'text/xml',
    'csv,json',
    'python source code',
    'application/sql+gzip',
    'application/xls',
    'sql',
    'nex',
    'weblog',
    'Google Doc',
    'gz:sql',
    'CIF',
    '.shp',
    'zip (csv)',
    'audio/basic',
    'pdf:0_documentation',
    'XLS',
    'URL',
    'xml (zipped)',
    'biopax',
    'text/json',
    'epub',
    'SQLite',
    'api/opensearch',
    'html | pdf',
    'Solr',
    'snorql',
    'accdb',
    'image/tiff',
    'PDF',
    'HTML',
    'api/sdmx+json/xml',
    'api/git',
    'application/octect-stream',
    'AutoCAD',
    'MAP',
    'application/zip+x-sqlite3',
    'mutiple formats',
    'text/sql',
    'XHTML',
    'application/x-excel',
    'Data File in STATA',
    'index',
    'DTA',
    'wmts',
    'ZIP',
    'ODS',
    'XML (Tomorrow Country)',
    'csv.gz',
    'xhtml',
    'html, rdf, dcif',
    'txt (zipped)',
    'arcgrid',
    'WFS',
    'auto',
    'example/html',
    'web site',
    'asp',
    'ODT',
    'nc:55',
    'ATCO-CIF',
    'XML /  JPG',
    'gdocs/table',
    'application/x-esri-shape',
    'MDB',
    'XML (Current)',
    'api/ontowiki',
    'application/vnd.ms-htmlhelp',
    'KML/KMZ',
    'zip:csv',
    'example/xhtml+xml',
    'Data File in EXCEL and RDF',
    'ESRI Shape Files',
    'GZ',
    'example',
    'image/x-ms-bmp',
    'microsoft excel',
    'ESRI SHAPE',
    'csv-geo-au',
    'Atom Feed',
    'xls',
    '.mif .mid',
    'jpeg',
    'mobi',
    'MS Excel CSV',
    'gclub',
    'image/png',
    'html/doc',
    'Webservices',
    'JSON / CSV / HTML / RSS',
    'text/x-bibtex',
    'text/x-csv',
    'tmx',
    'docx',
    'DOCX',
    'jmp',
    'text/plain; charset=iso-8859-15',
    'las',
    'atom',
    'ESRI ARC Export',
    'CS',
    'trados (zipped)',
    'api/hg',
    'SHP',
    'Binary',
    'bzip2:text/sql',
    'html/pdf',
    'info',
    'tar.xz',
    'py',
    '94593:figshare',
    'application/xhtml+xml',
    'ascii grid',
    'search',
    'CSV | MDB',
    'yaml',
    'wsdl',
    'bittorrent|zip|tsv',
    'SHAPE',
    'zip, csv, shp',
    'txt:R',
    '12bet',
    'index/html',
    'application/x-executable',
    '.zip',
    'data file in .shp',
    'XSLX',
    'GeoTiff',
    'access relational database',
    'png jpg txt',
    'do',
    'text/plain',
    'PPT, DOC, CSV, KMZ, JPG, TXT',
    'tab',
    'tomtom',
    'solr',
    'map',
    'XSD',
    'marc/xml',
    'GFTS',
    'JS',
    'reloc',
    'georss',
    'OAI-PMH',
    'application/x-trig',
    'exe',
    'application/xml+atom',
    'text/plain; charset=windows-1252',
    'TXT',
    'XML, json',
    'json/XML',
    'sqlite',
    'RSS',
    'Shape file .shp',
    'SHP',
    'application/x-rar-compressed',
    'web services, html',
    'metadata',
    'csv (zip)',
    'php',
    'RAR',
    'WordNet',
    'gtfs',
    'DOC',
    'csv',
    'MDG Info',
    'data',
    'Data File in EXCEL',
    'MARC21',
    'Various',
    'State of the World Children',
    '.doc',
    'csv:1',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'TopoJSON',
    'gml',
    'MARC',
    '.e00',
    'index/list',
    'iati-xml',
    'wfs/gml',
    'ScraperWiki',
    'text/x-osdata-csv',
    'application/x-msaccess',
    'GeoPDF',
    'JPEG',
    'image/gif',
    'application/trig',
    'Python script on wiki',
    'GDocs',
    'KMZ',
    'modsxml',
    'rss+xml',
    'kmz',
    'SPSS',
    'avi',
    'STL',
    'googledoc',
    'REST service on a Windows Communications Foundation',
    'RESTful',
    'Data File in SPSS',
    'fixed width',
    'ibc',
    'XML (Tomorrow Metro)',
    'BIN',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'Esri REST',
    'application/unknown',
    'aspx',
    'pdf',
    'audio/mpeg',
    'ArcGrid',
    'ESRI Shape File',
    'ris',
    'xsl',
    'img',
    'interactive on-screen',
    'creole',
    'zip',
    'csv, xls, ods, pdf mm',
    'other',
    '.JSON',
    'MapInfo Table',
    'MS Access',
    'DTa',
    'sql/zip',
    'text/plain; charset=iso-8859-1',
    'google-refine',
    'dat',
    'application/mp4',
    'SQLITE',
    'tar.bz2',
    'HTML',
    'rest/json',
    '1',
    'application/zip+application/xml',
    'mabxml',
    'json',
    'Data File in .shp',
    'zip archive',
    'Excel',
    'application/fits',
    'application/download',
    'application/json, application/xml',
    'HTML | PDF',
    'application/octet-stream',
    'application/x-zip-compressed',
    'meta/sitemap',
    'SISIS export format',
    'api/tool',
    '.gml',
    'zip:sql',
    'jsp',
    'video/mp4',
    'GeoJSON',
    'image/cgm',
    'service/gdocs/spreadsheet',
    'application/dbase',
    'hdf',
    'tgz',
    'tdyn/html',
    'application/x-msdownload; format=pe32',
    'text/html; charset=iso-8859-1',
    'application/x-hdf',
    'excel (.xlsx)',
    'geoRSS',
    'text/html; charset=us-ascii',
    'api',
    'query tool',
    'excel',
    'Data File in SPSS and STATA',
    'ai',
    'pptx',
    'GML',
    '.csv',
    'application/x-tika-msoffice',
    'XML, CSV, PDF, JPG, DOC',
    'ISO2709',
    'Atom',
    'phpBB',
    'Scraper',
    'XML',
    'AutoCAD DXF',
    'doc:04',
    'application/x-pdf',
    'PPT',
    'gdocs/spreadsheet',
    'marc',
    'kml',
    'CVS',
  ];

  formats.forEach(function (element) {
    updateFormat("INVALID", element);
  });



  res.send('yada');

});

router.get('/updateValid', function (req, res, next) {

  var formats = [
    '7z:ttl',
    'api/dcat',
    'api/linked-data',
    'api/sparql',
    'api/sparql',
    'api/sqarql',
    'appliation/x-trig',
    'application/ld+json',
    'application/n-triples',
    'application/n-triples, application/zip',
    'application/ntriples',
    'application/rdf xml',
    'application/rdf+json',
    'application/rdf+xml',
    'application/rdfs',
    'application/sparql-results+xml||text/rdf+n3||text/rdf+ttl||text/rdf+turtle||text/turtle||text/n3||application/turtle||application/x-turtle||application/rdf+xm',
    'application/turtle',
    'application/x-nquads',
    'application/x-ntriples',
    'application/x-tgz',
    'application/x-turtle',
    'application/xml+rdf',
    'bz2:nt',
    'compressed tarfile containing n-triples',
    'csv, json, xml, turtle',
    'Example (RDF/N3)',
    'example/application/rdf+xml',
    'example/html+rdfa',
    'example/HTML+RDFa',
    'example/n3',
    'example/ntriples',
    'example/rdf',
    'example/rdf xml',
    'example/rdf+json',
    'example/rdf+n3',
    'example/rdf+ttl',
    'example/rdf+turtle',
    'example/rdf+xml',
    'example/rdfa',
    'example/turtle',
    'example/x-turtle',
    'gz:nq',
    'gz:nt',
    'gz:ttl',
    'gz:ttl:owl',
    'GZIP::NQUADS',
    'gzip::nquads',
    'gzip:ntriples',
    'gzip:rdf/xml',
    'gzip:text/sql',
    'HTML, RDF',
    'HTML/RDF',
    'HTML+RDFa',
    'html+rdfa',
    'html+RDFa',
    'html+rdfa',
    'HTML+RDFa',
    'JSON LD',
    'JSON-LD',
    'json-ld',
    'linked data',
    'Linked Data',
    'mapping/<owl>',
    'mapping/OWL',
    'mapping/owl',
    'mapping/RDFS',
    'mapping/rdfs',
    'meta/owl',
    'meta/rdf-schema',
    'meta/rdf-schema',
    'meta/rdf+schema',
    'meta/void',
    'meta/void',
    'n-quads',
    'n-triple',
    'N-Triples',
    'n-triples',
    'N-Turtule',
    'N3',
    'nt',
    'nt.tar.bz2',
    'nt.tar.gz',
    'ntriples',
    'Ontology',
    'OWL',
    'owl, ontology, meta/owl',
    'RAR:RDF',
    'RDF',
    'rdf',
    'rdf (gzipped)',
    'RDF endpoint',
    'RDF-N3',
    'rdf-n3',
    'rdf-turtle',
    'rdf-Turtle',
    'RDF-Turtle',
    'rdf-xml',
    'RDF-XML',
    'rdf, csv, xml',
    'rdf, nt',
    'rdf, owl',
    'RDF, SPARQL+XML',
    'rdf, xml',
    'rdf:products:org:openfoodfacts',
    'rdf/dcat',
    'rdf/license',
    'rdf/n-triples',
    'rdf/n3',
    'RDF/N3',
    'RDF/NT',
    'rdf/provenance',
    'rdf/turtle',
    'rdf/void',
    'rdf/xml example',
    'RDF/XML, HTML, JSON',
    'RDF/XML, Turtle, HTML',
    'rdf+xml',
    'rdf+xml',
    'RDFa',
    'RDFXML',
    'RDN-N3',
    'rtf',
    'Sesame Repository',
    'SPARQ/JSON',
    'SPARQL',
    'SPARQL Endpoint',
    'SPARQL endpoint',
    'SPARQL-JSON',
    'sparql-json',
    'SPARQL-XML',
    'sparql-xml',
    'sparql/json',
    'SPARQL/JSON',
    'sparql/xml',
    'SPARQL/XML',
    'text/n3',
    'text/ntriples',
    'text/rdf+n3',
    'text/rdf+ttl',
    'text/ttl',
    'text/turtle',
    'trig',
    'ttl',
    'ttl:e1:csv',
    'ttl.bz2',
    'ttl.bzip2',
    'TURTLE',
    'turtle',
    'Turtle',
    'void',
    'xhtml, rdf/xml, turtle',
    'XHTML+RDFa',
    'XML, JSON, JSON-LDC (CONSTRUCT y DESCRIBE), Notation 3 / Turtle',
    'XML, JSON, RDF',
    'XML, RDF+XML, Turtle and JSON',
    'xml/rdf',
    'XML/RDF',
    'zip:ttl'
  ];

  formats.forEach(function (element) {
    updateFormat("VALID", element);
  });

  res.send('Check Logs!');

});

function updateFormat(status, element) {
  var Format = mongoose.model('Format');
  var format = new Format({ 'status': status, 'format': element });
  format.save();
}

function updateFormatNormalized(normalized, element) {
  var Format = mongoose.model('Format').update({format:element.format},{formatNormalized: normalized}, function(err, doc){
    console.log("Doc Updated!");
  });
}

router.get('/updateExtension', function (req, res, next) {
  
  
  
  // mongoose.model('Format').find({$and: [{$or : [{format: /ttl/i}, {format: /turtle/i}]}, {status:"VALID"} ] }, function(err, docs){
  //   docs.forEach(function(element){
  //     updateFormatNormalized("ttl", element);
      
  //   });
 // });
 
  //  mongoose.model('Format').find({$and: [{format: /dcat/i}, {status:"VALID"} ] }, function(err, docs){
  //   docs.forEach(function(element){
  //     updateFormatNormalized("ttl", element);
      
  //   });
 // });

  //  mongoose.model('Format').find({$and: [{format: /void/i}, {status:"VALID"} ] }, function(err, docs){
  //   docs.forEach(function(element){
  //     updateFormatNormalized("ttl", element);
      
  //   });
 // });
 
  //   mongoose.model('Format').find({$and: [{format: /trig/i}, {status:"VALID"} ] }, function(err, docs){
  //   docs.forEach(function(element){
  //     updateFormatNormalized("trig", element);
      
  //   });
 // });
  
  // mongoose.model('Format').find({$and: [{format: /arql/i}, {status:"VALID"} ] }, function(err, docs){
  //   docs.forEach(function(element){
  //     updateFormatNormalized("sparql", element);
  //   });
  // });
  
  // mongoose.model('Format').find({$and: [{format: /rdfa/i}, {status:"VALID"} ] }, function(err, docs){
  //   docs.forEach(function(element){
  //     updateFormatNormalized("rdfxml", element);
  //   });
  // });
  
  
 // mongoose.model('Format').find({$and: [{format: /rdf/i}, {status:"VALID"} ] }, function(err, docs){
  //   docs.forEach(function(element){
  //     updateFormatNormalized("rdfxml", element);
  //   });
  // });
  
  //  mongoose.model('Format').find({$and: [{format: /xml/i},{format: /rdf/i}, {status:"VALID"} ] }, function(err, docs){
  //   docs.forEach(function(element){
  //     updateFormatNormalized("rdfxml", element);
  //   });
  // });
  
 // mongoose.model('Format').find({$and: [{format: "RDF"}, {status:"VALID"} ] }, function(err, docs){
  //   docs.forEach(function(element){
  //     updateFormatNormalized("rdfxml", element);
  //   });
  // });

 // mongoose.model('Format').find({$and: [{format: "rdf"}, {status:"VALID"} ] }, function(err, docs){
  //   docs.forEach(function(element){
  //     updateFormatNormalized("rdfxml", element);
  //   });
  // });
  
 // mongoose.model('Format').find({$and: [{format: /nq/i}, {status:"VALID"} ] }, function(err, docs){
  //   docs.forEach(function(element){
  //     updateFormatNormalized("nq", element);
  //   });
  // });

 // mongoose.model('Format').find({$and: [{format: /nquad/i}, {status:"VALID"} ] }, function(err, docs){
  //   docs.forEach(function(element){
  //     updateFormatNormalized("nq", element);
  //   });
  // });

 // mongoose.model('Format').find({$and: [{format: /n-quad/i}, {status:"VALID"} ] }, function(err, docs){
  //   docs.forEach(function(element){
  //     updateFormatNormalized("nq", element);
  //   });
  // });
    
 // mongoose.model('Format').find({$and: [{format: /json-ld/i}, {status:"VALID"} ] }, function(err, docs){
  //   docs.forEach(function(element){
  //     updateFormatNormalized("json", element);
  //   });
  // });  
  
 // mongoose.model('Format').find({$and: [{format: /json/i}, {format: /ld/i}, {status:"VALID"} ] }, function(err, docs){
  //   docs.forEach(function(element){
  //     updateFormatNormalized("json", element);
  //   });
  // });  

 // mongoose.model('Format').find({$and: [{format: /json/i}, {format: /rdf/i}, {status:"VALID"} ] }, function(err, docs){
  //   docs.forEach(function(element){
  //     updateFormatNormalized("json", element);
  //   });
  // });  

 // mongoose.model('Format').find({$and: [{format: /nt/i},{format: /rdf/i}, {status:"VALID"} ] }, function(err, docs){
  //   docs.forEach(function(element){
  //     updateFormatNormalized("nt", element);
  //   });
  // });

 // mongoose.model('Format').find({$and: [{format: /ntriple/i}, {status:"VALID"} ] }, function(err, docs){
  //   docs.forEach(function(element){
  //     updateFormatNormalized("nt", element);
  //   });
  // });

 // mongoose.model('Format').find({$and: [{format: /n-triple/i}, {status:"VALID"} ] }, function(err, docs){
  //   docs.forEach(function(element){
  //     updateFormatNormalized("nt", element);
  //   });
  // });  
  
  //  mongoose.model('Format').find({$and: [{format: /nt/i}, {status:"VALID"} ] }, function(err, docs){
  //   docs.forEach(function(element){
  //     updateFormatNormalized("nt", element);
  //   });
  // });  
    
  // mongoose.model('Format').find({$and: [{format: /n3/i},{format: /rdf/i}, {status:"VALID"} ] }, function(err, docs){
  //   docs.forEach(function(element){
  //     updateFormatNormalized("n3", element);
  //   });
  // });
   
  // mongoose.model('Format').find({$and: [{format: /n3/i},{format: /rdf/i}, {status:"VALID"} ] }, function(err, docs){
  //   docs.forEach(function(element){
  //     updateFormatNormalized("n3", element);
  //   });
  // });
   
  // mongoose.model('Format').find({$and: [{format: /owl/i}, {status:"VALID"} ] }, function(err, docs){
  //   docs.forEach(function(element){
  //     updateFormatNormalized("owl", element);
  //   });
  // });
  
  // mongoose.model('Format').find({$and: [{format: /ontology/i}, {status:"VALID"} ] }, function(err, docs){
  //   docs.forEach(function(element){
  //     updateFormatNormalized("owl", element);
  //   });
  // });
  
  
      
});


module.exports = router;