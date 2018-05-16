({
    jsLoaded: function(component, event, helper) {
		// now re-create your map with markers
		var mapDiv = component.find('mapid').getElement();
        var map = L.map(mapDiv, {zoomControl: true, tap: false, zoomAnimation:true,fadeAnimation:true,markerZoomAnimation:true}).setView([50.256737697601494, 7.648483591683552], 14);
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
            {
                attribution: 'Tiles © Esri'
            }).addTo(map);
        component.set("v.map", map);
    },
    accountsLoaded: function(component, event, helper) {
        // Add markers
        var map = component.get('v.map');
        var accounts = event.getParam('accounts');
        for (var i=0; i<accounts.length; i++) {
            var account = accounts[i];
            var latLng = [account.BillingLatitude, account.BillingLongitude];
            L.marker(latLng, {account: account, title: account.Name}).addTo(map).on('click', function(event) {
    			helper.navigateToDetailsView(event.target.options.account.Id);
            });
        }  
        
        // center map to first account
        if(accounts[0]){
            map.panTo([accounts[0].BillingLatitude, accounts[0].BillingLongitude]);
        }
    },
    accountSelected: function(component, event, helper) {
        // Center the map on the account selected in the list
        var map = component.get('v.map');
        var account = event.getParam("account");
        map.panTo([account.BillingLatitude, account.BillingLongitude]);
    }
})
