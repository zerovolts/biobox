import test from "ava"

test((t: any) => {
  t.is(5, 5)
})

test((t: any) => {
  t.is(5, 6)
})
