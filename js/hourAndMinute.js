/**
 * 计算分针和时针之间相差的度数
 * @param {Number} h 时钟
 * @param {Number} m 分钟
 */
function hoursAndMinute (h, m = 15) {
  if (isNullUnderfined(h) || isNullUnderfined(m) || h >= 24 || m > 60) { throw new Error('args is not permission!') }
  const H = h % 12
  const hEdage = 30 * H + m / 2
  const mEdage = 6 * m
  const edage = Math.abs(hEdage - mEdage)
  return edage > 180 ? 360 - edage : edage
};

function isNullUnderfined (val) {
  const result = /(?:Null)/.test(Object.prototype.toString.call(val)) || typeof val === 'undefined'
  return result
}

/**
 * 查看运算结果
 * @param {Number} num 运算次数
 */
function test (num = 30000) {
  for (let i = 0; i < num; i++) {
    const hour = Math.floor(Math.random() * 24)
    const minute = Math.floor(Math.random() * 60)
    const result = hoursAndMinute(hour, minute)
    console.log('idnex ' + i + ': ' + hour + '时' + minute + ' result: ' + result)
  }
}

test()

/**
 * 验证结果可靠性
 */
function validate () {
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m++) {
      const val = Math.abs((30 * h) - (11 / 2 * m))
      if (val === 180 || val === 0) {
        console.log(h + ' H ' + m + 'M')
        console.log('validate: ' + hoursAndMinute(h, m))
      } else if (hoursAndMinute(h, m) > 180 || hoursAndMinute(h, m) < 0) {
        console.log('have a result is not right: ' + h + ' H' + m + ' M')
      }
    }
  }
}
