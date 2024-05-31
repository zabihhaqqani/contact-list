import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    RadioGroup,
    RadioGroupItem,
} from '@/components/ui/radio-group';
import { SquarePen } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { updateContact } from './contactSlice';

export function UpdateContact({ contact }) {
    const dispatch = useDispatch();

    const [contactDetails, setContactDetails] = useState({
        id: contact?.id,
        name: contact?.name,
        phoneNo: contact?.phoneNo,
        email: contact?.email,
        gender: contact?.gender,
        contactType: contact?.contactType,
    });

    const addContactHandler = (e) => {
        e.preventDefault();
        if (
            contact.name === contactDetails.name &&
            contact.phoneNo === contactDetails.phoneNo &&
            contact.email === contactDetails.email &&
            contact.gender === contactDetails.gender &&
            contact.contactType === contactDetails.contactType
        ) {
            toast.info(`No New Changes Made!`);
        } else {
            dispatch(updateContact(contactDetails));
            toast.success(`Contact Updated!`);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setContactDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <SquarePen
                    size={19}
                    className="cursor-pointer text-gray-700"
                />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form
                    onSubmit={addContactHandler}
                    className="flex flex-col gap-4"
                >
                    <DialogHeader>
                        <DialogTitle>
                            Edit Contact Details
                        </DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <Input
                        placeholder="Name"
                        required
                        type="text"
                        name="name"
                        value={contactDetails.name}
                        onChange={handleInputChange}
                    />
                    <Input
                        placeholder="Phone No"
                        required
                        type="number"
                        name="phoneNo"
                        value={contactDetails.phoneNo}
                        onChange={handleInputChange}
                    />
                    <Input
                        placeholder="Email"
                        required
                        type="email"
                        name="email"
                        value={contactDetails.email}
                        onChange={handleInputChange}
                    />
                    <div className="flex justify-between">
                        <RadioGroup
                            className="flex gap-5"
                            required
                            value={contactDetails.gender}
                            onValueChange={(value) =>
                                setContactDetails((prev) => ({
                                    ...prev,
                                    gender: value,
                                }))
                            }
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="Male"
                                    className="cursor-pointer"
                                    id="Male"
                                />
                                <Label
                                    htmlFor="Male"
                                    className="cursor-pointer"
                                >
                                    Male
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="Female"
                                    id="Female"
                                    className="cursor-pointer"
                                />
                                <Label
                                    htmlFor="Female"
                                    className="cursor-pointer"
                                >
                                    Female
                                </Label>
                            </div>
                        </RadioGroup>
                        <div className="border border-black mx-1"></div>

                        <RadioGroup
                            className="flex gap-5"
                            required
                            value={contactDetails.contactType}
                            onValueChange={(value) =>
                                setContactDetails((prev) => ({
                                    ...prev,
                                    contactType: value,
                                }))
                            }
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="Business"
                                    className="cursor-pointer"
                                    id="Business"
                                />
                                <Label
                                    htmlFor="Business"
                                    className="cursor-pointer"
                                >
                                    Business
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="Personal"
                                    className="cursor-pointer"
                                    id="Personal"
                                />
                                <Label
                                    htmlFor="Personal"
                                    className="cursor-pointer"
                                >
                                    Personal
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Update</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
