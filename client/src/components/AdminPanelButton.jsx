import {Button} from "react-bootstrap";

export const AdminPanelButton = ({modalFunction, buttonTitle}) => {
  return (
    <Button
      className={"mt-2"}
      variant={"outline-dark"}
      onClick={() => modalFunction(true)}
    >
      {buttonTitle}
    </Button>
  )
}