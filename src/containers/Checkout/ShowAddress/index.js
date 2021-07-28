import React, { useState } from 'react';
import { TiTick } from "react-icons/ti";

const ShowAddress = ({ add, updateAddress, confirmDelivaryAddress, editAddress, selectedAddress, setSelectedAddress }) => {
    const [selected, setSelected] = useState(false);
    const selectAddressHandler = () => {
        confirmDelivaryAddress(add);
        setSelected(true);
    };
    return (
        <>
            <div className="address">
                {!selectedAddress && <div className="address__input__container">
                    <input
                        onClick={() => updateAddress(add)}
                        type="radio"
                        name="address"
                    />
                </div>}
                <div className="address__detail__container">
                    <div className="address__details__primary">
                        <div className="address__details__title">
                            <div>
                                <span>Name: </span>
                                {add.name},
                            </div>
                            <div>Selected</div>
                        </div>
                        <div className="address__details__title">
                            <span>Contact No: </span>
                            {add.mobile},
                        </div>
                    </div>
                    <div className="address__details__secondary">
                        <span>Address: </span>
                        <span>{add.locality}, </span>
                        <span>{add.landmark}, </span>
                        <span>{add.address}, </span>
                        <span>{add.cityDistrictTown}, </span>
                        <span>{add.state}, </span>
                        <span>{add.pincode}</span>
                    </div>
                    <div className="address__details__type">
                        <div className="address__details__title">
                            <span>Type: </span>
                            {add.addressType}
                        </div>
                    </div>
                    <div className="address__details__submit">
                        {add.selected && !selectedAddress && (
                            <button onClick={selectAddressHandler}>
                                confirm address
                            </button>
                        )}
                        {add.selected && !selectedAddress && (
                            <button onClick={() => editAddress(add)}>edit</button>
                        )}
                        {selectedAddress && <button onClick={() => setSelectedAddress(null)}>Change</button>}
                    </div>
                </div>
                {selected && (
                    <div className="address__selected">
                        <TiTick />
                    </div>
                )}
            </div>
        </>
    );
};

export default ShowAddress;