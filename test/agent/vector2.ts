import test from "ava"

import Vector2 from "../../src/agent/vector2"

test((t: any) => {
  t.is(Vector2.zero(), Vector2.create(0, 0))
})

test((t: any) => {
  t.is(Vector2.random().normalize().magnitude, 1)
})
