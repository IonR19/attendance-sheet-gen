import React from "react";
import { Columns, Form } from "react-bulma-components";
import { useDispatch } from "react-redux";
import {
  setEndAt,
  setFrom,
  setIsDynamic,
  setStartAt,
  setThreshold,
  setTo,
  setWeekend,
  useTypedSelector,
} from "../store";

interface Props {}

const InputFilters: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const { from, to, endAt, startAt, isDynamic, threshold, weekends } = useTypedSelector(
    (s) => s.selection
  );
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
      <Columns.Column>
        <Form.Label>
          <Form.Checkbox
            checked={weekends}
            onChange={(e) => {
              dispatch(setWeekend(e.target.checked));
            }}
          ></Form.Checkbox>
          Disable Weekend
        </Form.Label>
      </Columns.Column>
      <Columns.Column size={1}>
        <Form.Label>
          <Form.Checkbox
            checked={isDynamic}
            onChange={(e) => {
              dispatch(setIsDynamic(e.target.checked));
            }}
          ></Form.Checkbox>
          Dynamic
        </Form.Label>
      </Columns.Column>
      <Columns.Column size={1}>
        <Form.Label>
          Threshold
          <Form.Input
            type="number"
            value={threshold}
            onChange={(e) => {
              dispatch(setThreshold(+e.target.value));
            }}
          ></Form.Input>
        </Form.Label>
      </Columns.Column>
    </Columns>
  );
};

export default InputFilters;
