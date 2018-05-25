({
    jsLoaded: function(component, event, helper) {
        try {
            // now re-create your map with markers
            var mapDiv = component.find('mapid').getElement();
            var map = L.map(mapDiv, {zoomControl: true, tap: false, zoomAnimation:false,fadeAnimation:true,markerZoomAnimation:true}).setView([50.256737697601494, 7.648483591683552], 14);
            L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
                {
                    attribution: 'Tiles © Esri'
                }).addTo(map);
            component.set("v.map", map);
        } catch (e) {
            // Handle error
            console.error(e);
            helper.showWarningToast(e.message);
        }
    },
    accountsLoaded: function(component, event, helper) {
        try {
            // Add markers
            var map = component.get('v.map');
            var accounts = event.getParam('accounts');
            for (var i=0; i<accounts.length; i++) {
                var account = accounts[i];
                var latLng = [account.BillingLatitude, account.BillingLongitude];
                var marker = L.marker(latLng, {account: account});
                //marker.bindTooltip(account.Name).openTooltip();
                marker.addTo(map).bindPopup(account.Name, {autoClose:false}).openPopup();
                marker.addTo(map).on('click', function(event) {
                    helper.navigateToDetailsView(event.target.options.account.Id);
                });
            }
            // center map to first account
            if(accounts[0]){
                map.panTo([accounts[0].BillingLatitude, accounts[0].BillingLongitude]);
            }
        } catch (e) {
            // Handle error
            console.error(e);
            helper.showWarningToast(e.message);
        }
    },
    accountSelected: function(component, event, helper) {
        // Center the map on the account selected in the list
        try {
            var map = component.get('v.map');
            var account = event.getParam("account");
            map.panTo([account.BillingLatitude, account.BillingLongitude]);
        } catch (e) {
            // Handle error
            console.error(e);
            helper.showWarningToast(e.message);
        }
    }
})