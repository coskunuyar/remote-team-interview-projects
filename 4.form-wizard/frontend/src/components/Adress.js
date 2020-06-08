import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

export default function Adress(props){
    const [address,setAddress] = React.useState("Istanbul,Levent 4. Sokak");
   
    React.useEffect(() => {
        props.onChange({target: { value: address } });
    },[]);

    const handleSelect = async (value) => {
        props.onChange({target: { value }});
    }

    return(<div>
        <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect} >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
                <input {...getInputProps({ placeholder: "Type adress" })} />
                <div>
                    {loading ? <div>...loading</div> : null}
                    {suggestions.map(suggestion => {
                        const style = {
                            backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                        }
                        return <div {...getSuggestionItemProps(suggestion,{style})}>
                            {suggestion.description}
                            </div>;
                    })}
                </div>
            </div>
            )}
        </PlacesAutocomplete>
    </div>)
}