public with sharing class AccountController {
    @AuraEnabled
    public static List<Account> findAll(String accountId) {
        Account acc = [SELECT Id, Name, BillingLatitude, BillingLongitude, BillingAddress 
                       FROM Account
                       WHERE Id = :accountId
                       LIMIT 1];
        
        return [SELECT Id, Name, BillingLatitude, BillingLongitude, BillingCity
                FROM Account
                WHERE BillingLatitude!=NULL AND BillingLongitude!=NULL
                ORDER BY DISTANCE(BillingAddress , :acc.BillingAddress, 'km')
                LIMIT 20];
    }
}
