
'use strict';
import debug from "debug";
const sip_domain = '112.80.5.159:9208';
const state = {
  register_success: false // 注册状态
}
const setting =
{
  eid: '00013093',
  port: 9208,
  display_name: null,
  uri: null,
  password: null,
  socket:
  {
    uri: 'wss://s01.vsbc.com:9060',
    via_transport: 'auto',
  },
  register_server: '112.80.5.159:9208',
  contact_uri: null,
  authorization_user: null,
  instance_id: null,
  session_timers: false,
  use_preloaded_route: false,
  // user_agent:'callcenter_w_pc_Sipek_win32/r35194',
  pcConfig:
  {
    rtcpMuxPolicy: 'negotiate',
    iceServers:
      [
        { urls: ['stun:stun.l.google.com:19302'] }
      ]
  }
};
let log = (type) => {
  return debug(type)
}
export { log, setting, sip_domain, state }
// 总机号：02566699734
// 邱朗：  1024
// 冯春燕：1006
// 贾国林：1026
// 曹士远:  1039
// 关璐璐：1023
// 宋光暖：1043
// 王惠：1042