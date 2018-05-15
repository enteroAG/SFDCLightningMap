({
    doInit : function(component, event) {
        var action = component.get("c.findAll");
        action.setParams({ accountId : component.get("v.accountId") });
        action.setCallback(this, function(a) {
            component.set("v.accounts", a.getReturnValue());
            window.setTimeout($A.getCallback(function() {
                var event = $A.get("e.c:AccountsLoaded");
                event.setParams({"accounts": a.getReturnValue()});
                console.log('log4');
                console.log(a.getReturnValue());
                event.fire();
            }), 500);
        });
    $A.enqueueAction(action);
    }
})