(function($){ 
    $.SP = $.SP || {};
    $.SP.UserProfileService = $.SP.UserProfileService || {};
    
    $.SP.UserProfileService.GetCommonManager = function (accountName) {
        var soap = '';
                
        soap += '<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">';
        soap += '   <soap12:Body>';
        soap += '       <GetCommonManager xmlns="http://microsoft.com/webservices/SharePointPortalServer/UserProfileService">';
        soap += '           <accountName>' + (accountName || '') + '</accountName>';   
        soap += '       </GetCommonManager>';
        soap += '   </soap12:Body>';
        soap += '</soap12:Envelope>';

        return $.ajax({
            type: "POST",
            contentType: "text/xml;charset='utf-8'",
            url: '/_vti_bin/userProfileService.asmx',
            data: soap,
            dataType: "xml"
        });
    }

    // Example use
    $.SP.UserProfileService.GetCommonManager().done(function(data, textStatus, jqXHR){
        var manager = $(data).find('GetCommonManagerResult');
        
        console.log({ 
            AccountName: manager.find('AccountName').text(),
            Privacy: manager.find('Privacy').text(),
            Name: manager.find('Name').text(),
            IsInWorkGroup: manager.find('IsInWorkGroup').text() === 'true'? true: false,
            Group: manager.find('Group').text(),
            Email: manager.find('Email').text(),
            Title: manager.find('Title').text(),
            Url: manager.find('Url').text(),
            UserProfileID: manager.find('UserProfileID').text(),
            ID: parseInt(manager.find('ID').text(),10)
        });
    });
})(jQuery);