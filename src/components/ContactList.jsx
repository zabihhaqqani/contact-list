import { AddContact } from '@/features/AddContact';
import { useDispatch, useSelector } from 'react-redux';
import { ContactCard } from './ContactCard';

export default function ContactList({ type }) {
    const dispatch = useDispatch();

    const contactListData = useSelector(
        (state) => state.contact.contactList
    );

    const filteredContacts = contactListData.filter(
        (contact) => contact.contactType === type
    );

    return (
        <div className="pl-[calc(100vw-100%)]">
            <div>
                <h2 className="text-[16px] md:text-[18px] font-semibold my-4]">
                    {type} Contacts ({filteredContacts?.length})
                </h2>
                <AddContact />
            </div>
            <div className="flex justify-center">
                {filteredContacts?.length >= 1 ? (
                    <div className="flex flex-col mx-5">
                        {filteredContacts
                            ?.reverse()
                            ?.map((contact) => (
                                <ContactCard
                                    key={contact.id}
                                    contact={contact}
                                />
                            ))}
                    </div>
                ) : (
                    <p className="mt-5 bg-gray-100 p-3 rounded-md font-semibold">
                        No Contacts!
                    </p>
                )}
            </div>
        </div>
    );
}
