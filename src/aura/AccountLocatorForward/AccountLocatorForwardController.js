({
	navigateToMyComponent : function(component, event, helper) {
        var evt = $A.get("e.force:navigateToComponent");
        evt.setParams({
            componentDef : "c:AccountLocator",
            componentAttributes: {
                accountId : component.get("v.recordId")
            }
        });
        evt.fire();
    }
})