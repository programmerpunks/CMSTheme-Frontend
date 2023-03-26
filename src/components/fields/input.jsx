export const Input = ({ type, id, placeholder, fieldstyle, editable, value, setFunction }) => {
  return <input
    type={type}
    id={id} placeholder={placeholder}
    className={`form-control team-details ${fieldstyle}`}
    value={value} style={{ borderWidth: editable ? 1 : 0 }} readOnly={!editable}
    onChange={(e) => setFunction(e.target.value)}
    required
  />
}
