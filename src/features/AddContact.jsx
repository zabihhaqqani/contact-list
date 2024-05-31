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
import { CirclePlus } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { addContact } from './contactSlice';

export function AddContact() {
    const dispatch = useDispatch();

    const [contactDetails, setContactDetails] = useState({
        id: uuidv4(),
        name: '',
        phoneNo: '',
        email: '',
        gender: '',
        contactType: '',
    });

    const addContactHandler = (e) => {
        e.preventDefault();

        if (
            contactDetails.gender === '' ||
            contactDetails.contactType === ''
        ) {
            toast.info('Fill all fields!');
        } else {
            dispatch(addContact(contactDetails));

            toast.success(
                `New Contact Added in ${contactDetails.contactType}!`
            );

            setContactDetails({
                id: uuidv4(),
                name: '',
                phoneNo: '',
                email: '',
                gender: '',
                contactType: '',
            });
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
                <div className="flex justify-center my-3">
                    <button className="flex items-center">
                        <span>
                            <CirclePlus className="mx-1" />
                        </span>
                        <span> Add Contact</span>
                    </button>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form
                    onSubmit={addContactHandler}
                    className="flex flex-col gap-4"
                >
                    <DialogHeader>
                        <DialogTitle>
                            Enter Contact Details
                        </DialogTitle>
                        <DialogDescription>
                            All fields are mandatory
                        </DialogDescription>
                    </DialogHeader>
                    <Input
                        placeholder="Name"
                        required
                        type="text"
                        name="name"
                        value={contactDetails.name}
                        onChange={handleInputChange}
                        maxLength="15"
                    />
                    <Input
                        placeholder="Phone No"
                        required
                        type="number"
                        name="phoneNo"
                        value={contactDetails.phoneNo}
                        onChange={(e) => {
                            const { name, value } = e.target;

                            const sanitizedValue = value
                                .replace(/\D/g, '')
                                .slice(0, 10);

                            setContactDetails((prev) => ({
                                ...prev,
                                [name]: sanitizedValue,
                            }));
                        }}
                    />
                    <Input
                        placeholder="Email"
                        required
                        type="email"
                        name="email"
                        value={contactDetails.email}
                        onChange={handleInputChange}
                        maxLength="30"
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
                                    required
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
                            required
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
                        <Button type="submit">Save</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
