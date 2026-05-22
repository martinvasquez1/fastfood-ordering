import { BadRequestException } from "@nestjs/common";
import { OrderStatus } from "./order.entity";

export const ORDER_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  [OrderStatus.PENDING]: [OrderStatus.PREPARING, OrderStatus.CANCELLED],
  [OrderStatus.PREPARING]: [OrderStatus.AWAITING_PICKUP, OrderStatus.CANCELLED],

  [OrderStatus.AWAITING_PICKUP]: [OrderStatus.ON_THE_WAY, OrderStatus.CANCELLED],
  [OrderStatus.ON_THE_WAY]: [OrderStatus.DELIVERED, OrderStatus.CANCELLED],

  [OrderStatus.DELIVERED]: [],
  [OrderStatus.CANCELLED]: [],
};

export function canTransition(from: OrderStatus, to: OrderStatus): boolean {
  const result = ORDER_TRANSITIONS[from].includes(to);
  return result;
}

function isFinalState(state: OrderStatus): boolean {
  return state === OrderStatus.DELIVERED || state === OrderStatus.CANCELLED;
}

export function validateTransition(from: OrderStatus, to: OrderStatus,): void {
  if (isFinalState(from)) throw new BadRequestException(`Order is in final state (${from}) and cannot be modified`);
  if (!canTransition(from, to)) throw new BadRequestException(`Cannot change order status from ${from} to ${to}`);
}