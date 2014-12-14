
function EntryPoint () {
	
}

EntryPoint.include = function include( file ) {
	document.write( '<script type="text/javascript" languaje="javascript" src="' +		
					file + '"></script>');
};

EntryPoint.begin = function begin () {
	var files = window["EntryPointFiles"];
	for (var i = 0; i < files.length; i++) {
			EntryPoint.include( files[i] );
	}
};

