import { ActionResultEnum } from 'src/constants/action-result.enum';
import { Card } from 'src/card/schemas/card.schema';
import { NextDeadlineEnum } from 'src/constants/next-deadline.enum';
import { addDays } from './add-days.helper';

export const checkUserAnswer = (card: Card, check: boolean): Card => {
  let actionResult: string = '';
  const oneAndHalfDays: number = 1000 * 60 * 600 * 24 * 0.5;
  const actionDay = new Date();
  const today: number = actionDay.valueOf();
  const deadLineDay = card.deadline.valueOf();
  const on_time = today - deadLineDay;

  if (on_time < oneAndHalfDays) {
    actionResult = ActionResultEnum.SUCCESS;
  } else {
    actionResult = ActionResultEnum.IGNORE_TRUE;
  }

  switch (check) {
    case true:
      if (on_time < oneAndHalfDays) {
        actionResult = ActionResultEnum.SUCCESS;
      } else {
        actionResult = ActionResultEnum.IGNORE_TRUE;
      }
      break;
    case false:
      if (on_time < oneAndHalfDays) {
        actionResult = ActionResultEnum.FAIL;
      } else {
        actionResult = ActionResultEnum.IGNORE_FALSE;
      }
      break;
    default:
      break;
  }

  switch (actionResult) {
    case ActionResultEnum.SUCCESS:
      switch (card.level) {
        case 1:
          card.level = 2;
          card.deadline = addDays(actionDay, NextDeadlineEnum.LEVEL_2);
          card.counter++;
          break;
        case 2:
          card.level = 3;
          card.deadline = addDays(actionDay, NextDeadlineEnum.LEVEL_3);
          card.counter++;
          break;
        case 3:
          card.level = 4;
          card.deadline = addDays(actionDay, NextDeadlineEnum.LEVEL_4);
          card.counter++;
          break;
        case 4:
          card.level = 5;
          card.deadline = addDays(actionDay, NextDeadlineEnum.LEVEL_5);
          card.counter++;
          break;
        case 5:
          card.level = 5;
          card.deadline = addDays(actionDay, NextDeadlineEnum.LEVEL_5);
          card.counter++;
          break;
        default:
          //
          break;
      }
      break;
    case ActionResultEnum.IGNORE_TRUE:
      switch (card.level) {
        case 1:
          card.level = 1;
          card.deadline = addDays(actionDay, NextDeadlineEnum.LEVEL_1);
          card.counter++;
          break;
        case 2:
          card.level = 1;
          card.deadline = addDays(actionDay, NextDeadlineEnum.LEVEL_1);
          card.counter++;
          break;
        case 3:
          card.level = 2;
          card.deadline = addDays(actionDay, NextDeadlineEnum.LEVEL_2);
          card.counter++;
          break;
        case 4:
          card.level = 3;
          card.deadline = addDays(actionDay, NextDeadlineEnum.LEVEL_3);
          card.counter++;
          break;
        case 5:
          card.level = 4;
          card.deadline = addDays(actionDay, NextDeadlineEnum.LEVEL_4);
          card.counter++;
          break;
        default:
          //
          break;
      }
      break;
    case ActionResultEnum.FAIL:
      switch (card.level) {
        case 1:
          card.level = 1;
          card.deadline = addDays(actionDay, NextDeadlineEnum.LEVEL_1);
          card.counter++;
          card.failed++;
          break;
        case 2:
          card.level = 1;
          card.deadline = addDays(actionDay, NextDeadlineEnum.LEVEL_1);
          card.counter++;
          card.failed++;
          break;
        case 3:
          card.level = 1;
          card.deadline = addDays(actionDay, NextDeadlineEnum.LEVEL_1);
          card.counter++;
          card.failed++;
          break;
        case 4:
          card.level = 1;
          card.deadline = addDays(actionDay, NextDeadlineEnum.LEVEL_1);
          card.counter++;
          card.failed++;
          break;
        case 5:
          card.level = 1;
          card.deadline = addDays(actionDay, NextDeadlineEnum.LEVEL_1);
          card.counter++;
          card.failed++;
          break;
        default:
          //
          break;
      }
      break;
    case ActionResultEnum.IGNORE_FALSE:
      switch (card.level) {
        case 1:
          card.level = 1;
          card.deadline = addDays(actionDay, NextDeadlineEnum.LEVEL_1);
          card.counter++;
          card.failed++;
          break;
        case 2:
          card.level = 1;
          card.deadline = addDays(actionDay, NextDeadlineEnum.LEVEL_1);
          card.counter++;
          card.failed++;
          break;
        case 3:
          card.level = 1;
          card.deadline = addDays(actionDay, NextDeadlineEnum.LEVEL_1);
          card.counter++;
          card.failed++;
          break;
        case 4:
          card.level = 1;
          card.deadline = addDays(actionDay, NextDeadlineEnum.LEVEL_1);
          card.counter++;
          card.failed++;
          break;
        case 5:
          card.level = 1;
          card.deadline = addDays(actionDay, NextDeadlineEnum.LEVEL_1);
          card.counter++;
          card.failed++;
          break;
        default:
          //
          break;
      }
      break;
    default:
      //
      break;
  }

  return card;
};
