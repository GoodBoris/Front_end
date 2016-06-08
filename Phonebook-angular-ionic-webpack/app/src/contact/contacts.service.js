export default class ContactsService {

    constructor($q, $log, $window) {
        'ngInject';

        let _supportsLocalStorage;
        let lsKeys;

        this.$q = $q;
        this.$log = $log;
        this.$window = $window;

        //Define public methods of service:
        this.findAll = findAll;
        this.add = add;
        this.update = update;
        this.remove = remove;
        this.getContactById = getContactById;
        this.getContactsByManager = getContactsByManager;

        init();

        function init() {
            try {
                _supportsLocalStorage = ('localStorage' in $window && $window.localStorage instanceof Storage);
            } catch (err) {
                _supportsLocalStorage = false;
                $log.info(err);
            }
            lsKeys = {
                contacts: "contacts",
                //If a user's offline but makes a change, may want to put in localStorage to persist to back end later.
                isContactsChanged: false
            };
            if (!$window.localStorage.getItem(lsKeys.contacts)) {
                let initialContacts = [
                    { "id": 1, "firstName": "James", "lastName": "King", "managerId": 0, "managerName": "", "reports": 4, "title": "President and CEO", "department": "Corporate", "cellPhone": "617-000-0001", "officePhone": "781-000-0001", "email": "jking@fakemail.com", "city": "Boston, MA", "pic": "James_King.jpg", "twitterId": "@fakejking", "blog": "http://coenraets.org" },
                    { "id": 2, "firstName": "Julie", "lastName": "Taylor", "managerId": 1, "managerName": "James King", "reports": 2, "title": "VP of Marketing", "department": "Marketing", "cellPhone": "617-000-0002", "officePhone": "781-000-0002", "email": "jtaylor@fakemail.com", "city": "Boston, MA", "pic": "Julie_Taylor.jpg", "twitterId": "@fakejtaylor", "blog": "http://coenraets.org" },
                    { "id": 3, "firstName": "Eugene", "lastName": "Lee", "managerId": 1, "managerName": "James King", "reports": 0, "title": "CFO", "department": "Accounting", "cellPhone": "617-000-0003", "officePhone": "781-000-0003", "email": "elee@fakemail.com", "city": "Boston, MA", "pic": "Eugene_Lee.jpg", "twitterId": "@fakeelee", "blog": "http://coenraets.org" },
                    { "id": 4, "firstName": "John", "lastName": "Williams", "managerId": 1, "managerName": "James King", "reports": 3, "title": "VP of Engineering", "department": "Engineering", "cellPhone": "617-000-0004", "officePhone": "781-000-0004", "email": "jwilliams@fakemail.com", "city": "Boston, MA", "pic": "John_Williams.jpg", "twitterId": "@fakejwilliams", "blog": "http://coenraets.org" },
                    { "id": 5, "firstName": "Ray", "lastName": "Moore", "managerId": 1, "managerName": "James King", "reports": 2, "title": "VP of Sales", "department": "Sales", "cellPhone": "617-000-0005", "officePhone": "781-000-0005", "email": "rmoore@fakemail.com", "city": "Boston, MA", "pic": "Ray_Moore.jpg", "twitterId": "@fakermoore", "blog": "http://coenraets.org" },
                    { "id": 6, "firstName": "Paul", "lastName": "Jones", "managerId": 4, "managerName": "John Williams", "reports": 0, "title": "QA Manager", "department": "Engineering", "cellPhone": "617-000-0006", "officePhone": "781-000-0006", "email": "pjones@fakemail.com", "city": "Boston, MA", "pic": "Paul_Jones.jpg", "twitterId": "@fakepjones", "blog": "http://coenraets.org" },
                    { "id": 7, "firstName": "Paula", "lastName": "Gates", "managerId": 4, "managerName": "John Williams", "reports": 0, "title": "Software Architect", "department": "Engineering", "cellPhone": "617-000-0007", "officePhone": "781-000-0007", "email": "pgates@fakemail.com", "city": "Boston, MA", "pic": "Paula_Gates.jpg", "twitterId": "@fakepgates", "blog": "http://coenraets.org" },
                    { "id": 8, "firstName": "Lisa", "lastName": "Wong", "managerId": 2, "managerName": "Julie Taylor", "reports": 0, "title": "Marketing Manager", "department": "Marketing", "cellPhone": "617-000-0008", "officePhone": "781-000-0008", "email": "lwong@fakemail.com", "city": "Boston, MA", "pic": "Lisa_Wong.jpg", "twitterId": "@fakelwong", "blog": "http://coenraets.org" },
                    { "id": 9, "firstName": "Gary", "lastName": "Donovan", "managerId": 2, "managerName": "Julie Taylor", "reports": 0, "title": "Marketing Manager", "department": "Marketing", "cellPhone": "617-000-0009", "officePhone": "781-000-0009", "email": "gdonovan@fakemail.com", "city": "Boston, MA", "pic": "Gary_Donovan.jpg", "twitterId": "@fakegdonovan", "blog": "http://coenraets.org" },
                    { "id": 10, "firstName": "Kathleen", "lastName": "Byrne", "managerId": 5, "managerName": "Ray Moore", "reports": 0, "title": "Sales Representative", "department": "Sales", "cellPhone": "617-000-0010", "officePhone": "781-000-0010", "email": "kbyrne@fakemail.com", "city": "Boston, MA", "pic": "Kathleen_Byrne.jpg", "twitterId": "@fakekbyrne", "blog": "http://coenraets.org" },
                    { "id": 11, "firstName": "Amy", "lastName": "Jones", "managerId": 5, "managerName": "Ray Moore", "reports": 0, "title": "Sales Representative", "department": "Sales", "cellPhone": "617-000-0011", "officePhone": "781-000-0011", "email": "ajones@fakemail.com", "city": "Boston, MA", "pic": "Amy_Jones.jpg", "twitterId": "@fakeajones", "blog": "http://coenraets.org" },
                    { "id": 12, "firstName": "Steven", "lastName": "Wells", "managerId": 4, "managerName": "John Williams", "reports": 0, "title": "Software Architect", "department": "Engineering", "cellPhone": "617-000-0012", "officePhone": "781-000-0012", "email": "swells@fakemail.com", "city": "Boston, MA", "pic": "Steven_Wells.jpg", "twitterId": "@fakeswells", "blog": "http://coenraets.org" }
                ]
                saveContacts(initialContacts);
            }
        }

        function parseContacts() {
            if (!_supportsLocalStorage) {
                return [];
            }
            let strContacts = $window.localStorage.getItem(lsKeys.contacts);
            //will be null if not found
            if (!!strContacts) {
                let contacts = JSON.parse(strContacts);
                //for consistency, always return an array
                if (!Array.isArray(contacts)) {
                    contacts = [contacts];
                }
                return contacts;
            }
            return [];
        }

        function saveContacts(contacts) {
            if (!_supportsLocalStorage) {
                return;
            }
            //assumption is that only objects/arrays will be passed in here.
            $window.localStorage.setItem(lsKeys.contacts, JSON.stringify(contacts));
        }

        function getContactById(contactId) {
            let contact = _(parseContacts()).find(function (contact) {
                return parseInt(contact.id) === parseInt(contactId);
            });
            return $q.when(contact);
        }

        function getContactsByManager(managerId) {
            let results = parseContacts().filter(function (element) {
                return parseInt(managerId) === parseInt(element.managerId);
            });
            return $q.when(results);
        }

        function findAll() {
            return $q.when(parseContacts());
        }

        function remove(contactId) {
            let updatingContacts = parseContacts();
            let deletingContact = _(updatingContacts).find(function (contact) {
                return contact.id === contactId;
            });
            updatingContacts.splice(updatingContacts.indexOf(deletingContact), 1);
            updatingContacts.forEach(function (contact) {
                if (parseInt(contact.managerId) === parseInt(deletingContact.id)) {
                    contact.managerId = 0;
                }
                if (contact.id === parseInt(deletingContact.managerId)) {
                    contact.reports--;
                }
            });
            saveContacts(updatingContacts);
            return $q.when(parseContacts());
        }

        function add(item) {
            let updatingContacts = parseContacts();
            updatingContacts.push(item);
            updatingContacts.some(function (contact) {
                if (parseInt(contact.id) === parseInt(item.managerId)) {
                    contact.reports++;
                    return true;
                }
            });
            saveContacts(updatingContacts);
            return this.$q.when(parseContacts());
        }

        function update(item) {
            let updatingContacts = parseContacts();
            updatingContacts.some(function (contact) {
                if (parseInt(contact.id) === parseInt(item.id)) {
                    if (parseInt(contact.managerId) !== parseInt(item.managerId)) {
                        updatingContacts.forEach(function (manager) {
                            if (parseInt(manager.id) === parseInt(contact.managerId)) {
                                manager.reports--;
                            }
                            if (parseInt(manager.id) === parseInt(item.managerId)) {
                                manager.reports++;
                            }
                        });
                    }
                    _.assign(contact, item);
                    return true;
                }
            });
            saveContacts(updatingContacts);
            return this.$q.when(parseContacts());
        }
    }
}