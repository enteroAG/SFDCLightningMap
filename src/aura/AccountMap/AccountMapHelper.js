({
    navigateToDetailsView : function(accountId) {
        var event = $A.get("e.force:navigateToSObject");
        event.setParams({
            "recordId": accountId
        });
        event.fire();
    },
    
    showWarningToast : function(message) {
    var toastEvent = $A.get("e.force:showToast");
    
    toastEvent.setParams({
        "title": "Warning",
        "message":"an error occured",
        "messageTemplate": "Please contact your admin (\"{0}\")",
        "messageTemplateData": [message],
        "type": "warning"
    });
    toastEvent.fire();
}
})