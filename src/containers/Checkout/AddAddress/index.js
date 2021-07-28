import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import CustomInput from '../../../components/CustomInput';
import CustomModal from '../../../components/CustomModal';
import Backdrop from '../../../components/Backdrop';
import Spinner from './../../../components/UI/Spinner';

import { addAddress } from '../../../store/actions';

const AddAddress = (props) => {
    const { initialData } = props;
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const [name, setName] = useState(initialData ? initialData.name : "");
    const [mobile, setMobile] = useState(
        initialData ? initialData.mobile : ""
    );
    const [pincode, setPincode] = useState(
        initialData ? initialData.pincode : ""
    );
    const [locality, setLocality] = useState(
        initialData ? initialData.locality : ""
    );
    const [address, setAddress] = useState(
        initialData ? initialData.address : ""
    );
    const [city, setCity] = useState(
        initialData ? initialData.cityDistrictTown : ""
    );
    const [statee, setStatee] = useState(initialData ? initialData.state : "");
    const [landmark, setLandmark] = useState(
        initialData ? initialData.landmark : ""
    );
    const [alternatePhone, setAlternatePhone] = useState(
        initialData ? initialData.alternatePhone : ""
    );
    const [addressType, setAddressType] = useState(
        initialData ? initialData.addressType : ""
    );

    const addressSubmitHandler = (e) => {
        const payload = {
            address: {
                name,
                mobile,
                pincode,
                locality,
                address,
                cityDistrictTown: city,
                state: statee,
                landmark,
                alternatePhone,
                addressType,
            },
        };
        if (initialData && initialData._id) {
            payload.address._id = initialData._id;
        }
        dispatch(addAddress(payload));
        props.handleClose()
    };
    return (
        <>

            <Backdrop closeModalHandler={props.handleClose} />
            <CustomModal
                handleClose={props.handleClose}
                handlerSubmit={addressSubmitHandler}
                title="Add Address">
                <div className="address__form__container">
                    {!user.loading ?
                        (<>
                            <div className="address__form__column">
                                <CustomInput
                                    label="Name"
                                    type="text"
                                    placeholder="User Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <CustomInput
                                    label="Pincode"
                                    type="number"
                                    placeholder="Pincode"
                                    value={pincode}
                                    onChange={(e) => setPincode(e.target.value)}
                                />
                                <CustomInput
                                    label="Locality"
                                    type="text"
                                    placeholder="Locality"
                                    value={locality}
                                    onChange={(e) => setLocality(e.target.value)}
                                />
                                <CustomInput
                                    label="City"
                                    type="text"
                                    placeholder="City"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                                <CustomInput
                                    label="Alternative Phone"
                                    type="number"
                                    placeholder="Alternative Phone"
                                    value={alternatePhone}
                                    onChange={(e) => setAlternatePhone(e.target.value)}
                                />
                            </div>
                            <div className="address__form__column">
                                <CustomInput
                                    label="Mobile"
                                    type="number"
                                    placeholder="User Phone"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                />
                                <CustomInput
                                    label="Landmark"
                                    type="text"
                                    placeholder="Landmark"
                                    value={landmark}
                                    onChange={(e) => setLandmark(e.target.value)}
                                />
                                <CustomInput
                                    label="Address"
                                    type="text"
                                    placeholder="Address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                                <CustomInput
                                    label="State"
                                    type="text"
                                    placeholder="State"
                                    value={statee}
                                    onChange={(e) => setStatee(e.target.value)}
                                />
                                <div className="custom__input__container">
                                    <div className="custom__input">
                                        <label>Location Type</label>
                                        <select
                                            value={addressType}
                                            onChange={(e) => setAddressType(e.target.value)}>
                                            <option value="">--Select--</option>
                                            <option value="Home">Home</option>
                                            <option value="Work">Work</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </>
                        ) :
                        <Spinner />
                    }
                </div>
            </CustomModal>
        </>
    );
};

export default AddAddress;