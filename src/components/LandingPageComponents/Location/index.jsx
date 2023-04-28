import React from 'react'
import StateDropdown from '../../Dropdown/StateDropdown'

const Index = () => {
    return (
        <div className="location__div hidden md:flex gap-3">
            <p className="text">Choose your location</p>
            <StateDropdown />
        </div>
    )
}

export default Index