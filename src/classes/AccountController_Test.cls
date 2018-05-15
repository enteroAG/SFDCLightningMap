@isTest
private class AccountController_Test {
	
	@isTest static void test_findAll() {
		// Setup Test Account
		Account acc = new Account(Name='APEX_TEST Account', BillingLatitude=37.794118, BillingLongitude=-122.394984); 
		insert acc;

		// test method
		List<Account> accs = AccountController.findAll(acc.Id);
		// only one account found
		System.assertEquals(1, accs.size());
	}
}