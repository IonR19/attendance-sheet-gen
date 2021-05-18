import React from "react";
import { Columns, Form } from "react-bulma-components";
import { useDispatch } from "react-redux";
import { setEndAt, setFrom, setStartAt, setTo, useTypedSelector } from "../store";

interface Props {}

const InputFilters: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const { from, to, endAt, startAt } = useTypedSelector((s) => s.selection);
  return (
    <Columns>
      <Columns.Column size={3}>
        <Form.Label>
          From
          <Form.Input
            type="date"
            value={from}
            onChange={(e) => dispatch(setFrom(e.target.value))}
          ></Form.Input>
        </Form.Label>
      </Columns.Column>
      <Columns.Column size={3}>
        <Form.Label>
          To
          <Form.Input
            type="date"
            value={to}
            onChange={(e) => dispatch(setTo(e.target.value))}
          ></Form.Input>
        </Form.Label>
      </Columns.Column>
      <Columns.Column size={3}>
        <Form.Label>
          Start Time
          <Form.Input
            type="time"
            value={startAt}
            onChange={(e) => dispatch(setStartAt(e.target.value))}
          ></Form.Input>
        </Form.Label>
      </Columns.Column>
      <Columns.Column size={3}>
        <Form.Label>
          End Time
          <Form.Input
            type="time"
            value={endAt}
            onChange={(e) => dispatch(setEndAt(e.target.value))}
          ></Form.Input>
        </Form.Label>
      </Columns.Column>
    </Columns>
  );
};

export default InputFilters;
