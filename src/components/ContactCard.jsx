import { UpdateContact } from '@/features/UpdateContact';
import { deleteContact } from '@/features/contactSlice';
import { CookingPot, Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';

export function ContactCard({ contact }) {
    const dispatch = useDispatch();
    return (
        <div className="flex justify-between items-center py-4 bg-gray-100 my-3 md:px-8 md:rounded-[80px] gap-3 md:flex-row flex-col rounded-lg  px-3 shadow-md">
            <p className="md:w-[140px] text-left">{contact.name}</p>
            <p className="md:w-[120px] text-left">
                {contact.phoneNo}
            </p>
            <p className="md:w-[220px] text-left">{contact.email}</p>
            <p className="md:w-[80px] text-left">{contact.gender}</p>
            <div className=" flex gap-3 items-center">
                <Trash2
                    size={20}
                    onClick={() =>
                        dispatch(deleteContact(contact.id))
                    }
                    className="cursor-pointer text-red-500"
                />
                <UpdateContact contact={contact} />
            </div>
        </div>
    );
}
