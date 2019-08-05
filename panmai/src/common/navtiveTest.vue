<template>
  <div>
    <input type="text" v-model="text">

    <ul>
      <li v-for="item in fillterArr">
        <span v-html="item.show"></span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
    name: 'navtiveTest',
    data() {
        return {
            msg: '13123',
            text: '',

            arr: [
                {
                    id: 1000334448,
                    seid: 134,
                    ccgeid: 282,
                    displayname: 'zt',
                    number: '1029',
                    get_number_type: 1,
                    work_number: 'zt',
                    password: 'MTIzNDU2',
                    email: null,
                    mobile: '18913908746',
                    m_operator: null,
                    m_area_code: null,
                    duty: null,
                    address: null,
                    paid: 0,
                    direct_number: null,
                    callintype: 4,
                    seat_type: 0,
                    is_online_seat: 'N',
                    is_mobile_seat: 'N',
                    mobile_verified: 'N',
                    disabled: 0,
                    device_number: '18913908746',
                    device_binded: 'Y',
                    groups: [],
                    seat_realtime_state: {
                        id: 334061,
                        uid: 1000334448,
                        seid: 134,
                        ccgeid: 282,
                        state_id: 1,
                        state_name: '\u79bb\u7ebf',
                        sub_state_id: 0,
                        sub_state_name: '',
                        state_switch_time: 0,
                        created_at: '2019-04-22 11:21:02',
                        updated_at: '2019-04-22 11:21:02'
                    },
                    created_at: '2019-04-22 11:21:02',
                    updated_at: '2019-04-22 11:21:11'
                },
                {
                    id: 1000056299,
                    seid: 134,
                    ccgeid: 282,
                    displayname: 'qeqeq1',
                    number: '1025',
                    get_number_type: 1,
                    work_number: '1025',
                    password: 'Y2N6eDEyMzQ1Ng==',
                    email: '',
                    mobile: '',
                    m_operator: null,
                    m_area_code: null,
                    duty: '',
                    address: '',
                    paid: 0,
                    direct_number: '',
                    callintype: 2,
                    seat_type: 0,
                    is_online_seat: 'N',
                    is_mobile_seat: 'N',
                    mobile_verified: 'N',
                    disabled: 0,
                    device_number: null,
                    device_binded: 'N',
                    groups: [],
                    seat_realtime_state: {
                        id: 55899,
                        uid: 1000056299,
                        seid: 134,
                        ccgeid: 282,
                        state_id: 1,
                        state_name: '\u79bb\u7ebf',
                        sub_state_id: 0,
                        sub_state_name: '',
                        state_switch_time: 0,
                        created_at: '2019-04-15 12:08:08',
                        updated_at: '2019-04-15 12:08:08'
                    },
                    created_at: '2019-04-15 12:08:08',
                    updated_at: '2019-04-15 12:08:08'
                },
                {
                    id: 1000056292,
                    seid: 134,
                    ccgeid: 282,
                    displayname: 'gy4',
                    number: '1024',
                    get_number_type: 1,
                    work_number: '1024',
                    password: 'Y2N6eDEyMzQ1Ng==',
                    email: '',
                    mobile: '',
                    m_operator: null,
                    m_area_code: null,
                    duty: '',
                    address: '',
                    paid: 0,
                    direct_number: '',
                    callintype: 2,
                    seat_type: 0,
                    is_online_seat: 'N',
                    is_mobile_seat: 'N',
                    mobile_verified: 'N',
                    disabled: 0,
                    device_number: null,
                    device_binded: 'N',
                    groups: [],
                    seat_realtime_state: {
                        id: 55892,
                        uid: 1000056292,
                        seid: 134,
                        ccgeid: 282,
                        state_id: 1,
                        state_name: '\u79bb\u7ebf',
                        sub_state_id: 0,
                        sub_state_name: '',
                        state_switch_time: 0,
                        created_at: '2019-04-15 11:49:58',
                        updated_at: '2019-04-15 11:49:58'
                    },
                    created_at: '2019-04-15 11:49:58',
                    updated_at: '2019-04-15 11:49:58'
                },
                {
                    id: 1000056291,
                    seid: 134,
                    ccgeid: 282,
                    displayname: 'gy3',
                    number: '1023',
                    get_number_type: 1,
                    work_number: '1023',
                    password: 'Y2N6eDEyMzQ1Ng==',
                    email: '',
                    mobile: '',
                    m_operator: null,
                    m_area_code: null,
                    duty: '',
                    address: '',
                    paid: 0,
                    direct_number: '',
                    callintype: 2,
                    seat_type: 0,
                    is_online_seat: 'N',
                    is_mobile_seat: 'N',
                    mobile_verified: 'N',
                    disabled: 0,
                    device_number: null,
                    device_binded: 'N',
                    groups: [],
                    seat_realtime_state: {
                        id: 55891,
                        uid: 1000056291,
                        seid: 134,
                        ccgeid: 282,
                        state_id: 1,
                        state_name: '\u79bb\u7ebf',
                        sub_state_id: 0,
                        sub_state_name: '',
                        state_switch_time: 0,
                        created_at: '2019-04-15 11:49:58',
                        updated_at: '2019-04-15 11:49:58'
                    },
                    created_at: '2019-04-15 11:49:58',
                    updated_at: '2019-04-15 11:49:58'
                },
                {
                    id: 1000056290,
                    seid: 134,
                    ccgeid: 282,
                    displayname: 'gy2',
                    number: '1022',
                    get_number_type: 1,
                    work_number: '1022',
                    password: 'Y2N6eDEyMzQ1Ng==',
                    email: '',
                    mobile: '',
                    m_operator: null,
                    m_area_code: null,
                    duty: '',
                    address: '',
                    paid: 0,
                    direct_number: '',
                    callintype: 2,
                    seat_type: 0,
                    is_online_seat: 'N',
                    is_mobile_seat: 'N',
                    mobile_verified: 'N',
                    disabled: 0,
                    device_number: null,
                    device_binded: 'N',
                    groups: [],
                    seat_realtime_state: {
                        id: 55890,
                        uid: 1000056290,
                        seid: 134,
                        ccgeid: 282,
                        state_id: 1,
                        state_name: '\u79bb\u7ebf',
                        sub_state_id: 0,
                        sub_state_name: '',
                        state_switch_time: 0,
                        created_at: '2019-04-15 11:49:58',
                        updated_at: '2019-04-15 11:49:58'
                    },
                    created_at: '2019-04-15 11:49:58',
                    updated_at: '2019-04-15 11:49:58'
                },
                {
                    id: 1000056289,
                    seid: 134,
                    ccgeid: 282,
                    displayname: 'sfsf',
                    number: '131313',
                    get_number_type: 1,
                    work_number: '131313',
                    password: 'cXdlMTIz',
                    email: '',
                    mobile: '',
                    m_operator: null,
                    m_area_code: null,
                    duty: '',
                    address: '',
                    paid: 0,
                    direct_number: '',
                    callintype: 2,
                    seat_type: 0,
                    is_online_seat: 'N',
                    is_mobile_seat: 'N',
                    mobile_verified: 'N',
                    disabled: 0,
                    device_number: null,
                    device_binded: 'N',
                    groups: [],
                    seat_realtime_state: {
                        id: 55889,
                        uid: 1000056289,
                        seid: 134,
                        ccgeid: 282,
                        state_id: 1,
                        state_name: '\u79bb\u7ebf',
                        sub_state_id: 0,
                        sub_state_name: '',
                        state_switch_time: 0,
                        created_at: '2019-04-15 11:47:14',
                        updated_at: '2019-04-15 11:47:14'
                    },
                    created_at: '2019-04-15 11:47:14',
                    updated_at: '2019-04-15 11:47:14'
                },
                {
                    id: 1000056288,
                    seid: 134,
                    ccgeid: 282,
                    displayname: 'ttt1',
                    number: '59005',
                    get_number_type: 1,
                    work_number: '59005',
                    password: 'cXdlMTIz',
                    email: '',
                    mobile: '',
                    m_operator: null,
                    m_area_code: null,
                    duty: '',
                    address: '',
                    paid: 0,
                    direct_number: '',
                    callintype: 2,
                    seat_type: 0,
                    is_online_seat: 'N',
                    is_mobile_seat: 'N',
                    mobile_verified: 'N',
                    disabled: 0,
                    device_number: null,
                    device_binded: 'N',
                    groups: [],
                    seat_realtime_state: {
                        id: 55888,
                        uid: 1000056288,
                        seid: 134,
                        ccgeid: 282,
                        state_id: 1,
                        state_name: '\u79bb\u7ebf',
                        sub_state_id: 0,
                        sub_state_name: '',
                        state_switch_time: 0,
                        created_at: '2019-04-15 11:47:14',
                        updated_at: '2019-04-15 11:47:14'
                    },
                    created_at: '2019-04-15 11:47:14',
                    updated_at: '2019-04-15 11:47:14'
                },
                {
                    id: 1000056287,
                    seid: 134,
                    ccgeid: 282,
                    displayname: '2test4',
                    number: '39007',
                    get_number_type: 1,
                    work_number: '39007',
                    password: 'cXdlMTIz',
                    email: '',
                    mobile: '',
                    m_operator: null,
                    m_area_code: null,
                    duty: '',
                    address: '',
                    paid: 0,
                    direct_number: '',
                    callintype: 2,
                    seat_type: 0,
                    is_online_seat: 'N',
                    is_mobile_seat: 'N',
                    mobile_verified: 'N',
                    disabled: 0,
                    device_number: null,
                    device_binded: 'N',
                    groups: [],
                    seat_realtime_state: {
                        id: 55887,
                        uid: 1000056287,
                        seid: 134,
                        ccgeid: 282,
                        state_id: 1,
                        state_name: '\u79bb\u7ebf',
                        sub_state_id: 0,
                        sub_state_name: '',
                        state_switch_time: 0,
                        created_at: '2019-04-15 11:45:09',
                        updated_at: '2019-04-15 11:45:09'
                    },
                    created_at: '2019-04-15 11:45:09',
                    updated_at: '2019-04-15 11:45:09'
                },
                {
                    id: 1000056286,
                    seid: 134,
                    ccgeid: 282,
                    displayname: '1test10',
                    number: '29013',
                    get_number_type: 1,
                    work_number: '29013',
                    password: 'cXdlMTIz',
                    email: '',
                    mobile: '',
                    m_operator: null,
                    m_area_code: null,
                    duty: '',
                    address: '',
                    paid: 0,
                    direct_number: '',
                    callintype: 2,
                    seat_type: 0,
                    is_online_seat: 'N',
                    is_mobile_seat: 'N',
                    mobile_verified: 'N',
                    disabled: 0,
                    device_number: null,
                    device_binded: 'N',
                    groups: [],
                    seat_realtime_state: {
                        id: 55886,
                        uid: 1000056286,
                        seid: 134,
                        ccgeid: 282,
                        state_id: 1,
                        state_name: '\u79bb\u7ebf',
                        sub_state_id: 0,
                        sub_state_name: '',
                        state_switch_time: 0,
                        created_at: '2019-04-15 11:44:26',
                        updated_at: '2019-04-15 11:44:26'
                    },
                    created_at: '2019-04-15 11:44:26',
                    updated_at: '2019-04-15 11:44:26'
                },
                {
                    id: 1000056285,
                    seid: 134,
                    ccgeid: 282,
                    displayname: '1test9',
                    number: '29012',
                    get_number_type: 1,
                    work_number: '29012',
                    password: 'cXdlMTIz',
                    email: '',
                    mobile: '',
                    m_operator: null,
                    m_area_code: null,
                    duty: '',
                    address: '',
                    paid: 0,
                    direct_number: '',
                    callintype: 2,
                    seat_type: 0,
                    is_online_seat: 'N',
                    is_mobile_seat: 'N',
                    mobile_verified: 'N',
                    disabled: 0,
                    device_number: null,
                    device_binded: 'N',
                    groups: [],
                    seat_realtime_state: {
                        id: 55885,
                        uid: 1000056285,
                        seid: 134,
                        ccgeid: 282,
                        state_id: 1,
                        state_name: '\u79bb\u7ebf',
                        sub_state_id: 0,
                        sub_state_name: '',
                        state_switch_time: 0,
                        created_at: '2019-04-15 11:44:26',
                        updated_at: '2019-04-15 11:44:26'
                    },
                    created_at: '2019-04-15 11:44:26',
                    updated_at: '2019-04-15 11:44:26'
                }
            ],
            links: {
                first: 'http://emic-cmb.emicloud.com/seat/282?page=1',
                last: 'http://emic-cmb.emicloud.com/seat/282?page=5',
                prev: null,
                next: 'http://emic-cmb.emicloud.com/seat/282?page=2'
            },
            meta: {
                current_page: 1,
                from: 1,
                last_page: 5,
                path: 'http://emic-cmb.emicloud.com/seat/282',
                per_page: '10',
                to: 10,
                total: 43
            }
        }
    },
    computed: {
        fillterArr() {
            return this.arr.filter(v => {
                let number = ''
                let work_number = ''
                let displayname = ''
                if (v.displayname.indexOf(this.text) != -1) {
                    displayname = v.displayname.replace(this.text, function(
                        word
                    ) {
                        return `<span style='background:red'>${word}</span>`
                    })
                }
                if (String(v.number).indexOf(this.text) != -1) {
                    let str = String(v.number).replace(this.text, function(
                        word
                    ) {
                        return `<span style='background:red'>${word}</span>`
                    })
                    number = str ? `(${str})` : ''
                }
                if (String(v.work_number).indexOf(this.text) != -1) {
                    let str = String(v.work_number).replace(this.text, function(
                        word
                    ) {
                        return `<span style='background:red'>${word}</span>`
                    })
                    work_number = str ? `(${str})` : ''
                }
                if (displayname || number || work_number) {
                    v.show =
                        (displayname || v.displayname) +
                        (number || v.number) +
                        (work_number || v.work_number)
                } else {
                    v.show = false
                }
                return Boolean(v.show)
            })
        }
    },
    mounted() {
        // this.$emit('parent', 123123)
    }
}
</script>
