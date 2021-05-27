import { urlFull, optionsDefault } from './config'
const getcfdireporissues = urlFull('Issued?')
const cfdiservices = {
    async getcfdireporissues(companygroup, company, cfditype, datestart, dateend, pageSize, pageNo) {
        if (company === null && cfditype === null) {
            const res = await fetch(`${getcfdireporissues}companygroup=${companygroup}&pageSize=${pageSize}&pageNo=${pageNo}`, { method: 'GET', ...optionsDefault, })
            const json = await res.json()
            return json
        }
        if (company != null && cfditype != null) {
            const res = await fetch(`${getcfdireporissues}companygroup=${companygroup}&company=${company}&cfditype=${cfditype}&cfdidatetimestart=${datestart}&cfdidatetimeend=${dateend}&pageSize=${pageSize}&pageNo=${pageNo}`, { method: 'GET', ...optionsDefault, })
            const json = await res.json()
            return json
        }
        if (company != null && cfditype === null) {
            const res = await fetch(`${getcfdireporissues}companygroup=${companygroup}&company=${company}&pageSize=${pageSize}&pageNo=${pageNo}`, { method: 'GET', ...optionsDefault, })
            const json = await res.json()
            return json
        }
        if (company != null && cfditype != null) {
            const res = await fetch(`${getcfdireporissues}companygroup=${companygroup}&company=${company}&cfditype=${cfditype}&pageSize=${pageSize}&pageNo=${pageNo}`, { method: 'GET', ...optionsDefault, })
            const json = await res.json()
            return json
        }
        if (company === null && cfditype != null) {
            const res = await fetch(`${getcfdireporissues}companygroup=${companygroup}&cfditype=${cfditype}&pageSize=${pageSize}&pageNo=${pageNo}`, { method: 'GET', ...optionsDefault, })
            const json = await res.json()
            return json
        }
        if (datestart != null && dateend != null) {
            if (company != null && cfditype === null) {
                const res = await fetch(`${getcfdireporissues}companygroup=${companygroup}&company=${company}&cfdidatetimestart=${datestart}&cfdidatetimeend=${dateend}&pageSize=${pageSize}&pageNo=${pageNo}`, { method: 'GET', ...optionsDefault, })
                const json = await res.json()
                return json
            }
            if (company === null && cfditype != null) {
                const res = await fetch(`${getcfdireporissues}companygroup=${companygroup}&cfditype=${cfditype}&cfdidatetimestart=${datestart}&cfdidatetimeend=${dateend}&pageSize=${pageSize}&pageNo=${pageNo}`, { method: 'GET', ...optionsDefault, })
                const json = await res.json()
                return json
            }
            if (company != null && cfditype != null) {
                const res = await fetch(`${getcfdireporissues}companygroup=${companygroup}&cfdidatetimestart=${datestart}&cfdidatetimeend=${dateend}&pageSize=${pageSize}&pageNo=${pageNo}`, { method: 'GET', ...optionsDefault, })
                const json = await res.json()
                return json
            }
        }
    }
}
export default {...cfdiservices }