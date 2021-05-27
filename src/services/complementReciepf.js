import { urlFull, optionsDefault } from './config'
const getcfdireporcomplemntf = urlFull('ComplementF?')
const cfdiservicescomplementf = {
    async getcfdireporcomplemntf(companygroup, company, cfditype, paymentmethod, datestart, dateend, pageSize, pageNo) {
        if (company === null && cfditype === null) {
            const res = await fetch(`${getcfdireporcomplemntf}companygroup=${companygroup}&pageSize=${pageSize}&pageNo=${pageNo}`, { method: 'GET', ...optionsDefault, })
            const json = await res.json()
            return json
        } else if (company != null && cfditype == null && paymentmethod == null && datestart == null && dateend == null) {
            const res = await fetch(`${getcfdireporcomplemntf}companygroup=${companygroup}&company=${company}&pageSize=${pageSize}&pageNo=${pageNo}`, { method: 'GET', ...optionsDefault, })
            const json = await res.json()
            return json
        } else if (company == null && cfditype != null && paymentmethod == null && datestart == null && dateend == null) {
            const res = await fetch(`${getcfdireporcomplemntf}companygroup=${companygroup}&cfditype=${cfditype}&pageSize=${pageSize}&pageNo=${pageNo}`, { method: 'GET', ...optionsDefault, })
            const json = await res.json()
            return json
        } else if (company != null && cfditype != null && paymentmethod == null && datestart == null && dateend == null) {
            const res = await fetch(`${getcfdireporcomplemntf}companygroup=${companygroup}&company=${company}&cfditype=${cfditype}&pageSize=${pageSize}&pageNo=${pageNo}`, { method: 'GET', ...optionsDefault, })
            const json = await res.json()
            return json
        } else if (company == null && cfditype == null && paymentmethod != null && datestart == null && dateend == null) {
            const res = await fetch(`${getcfdireporcomplemntf}companygroup=${companygroup}&paymentmethod=${paymentmethod}&pageSize=${pageSize}&pageNo=${pageNo}`, { method: 'GET', ...optionsDefault, })
            const json = await res.json()
            return json
        } else if (company != null && cfditype == null && paymentmethod != null && datestart == null && dateend == null) {
            const res = await fetch(`${getcfdireporcomplemntf}companygroup=${companygroup}&company=${company}&paymentmethod=${paymentmethod}&pageSize=${pageSize}&pageNo=${pageNo}`, { method: 'GET', ...optionsDefault, })
            const json = await res.json()
            return json
        } else if (company == null && cfditype != null && paymentmethod != null && datestart == null && dateend == null) {
            const res = await fetch(`${getcfdireporcomplemntf}companygroup=${companygroup}&cfditype=${cfditype}&paymentmethod=${paymentmethod}&pageSize=${pageSize}&pageNo=${pageNo}`, { method: 'GET', ...optionsDefault, })
            const json = await res.json()
            return json
        } else if (company != null && cfditype != null && paymentmethod != null && datestart == null && dateend == null) {
            const res = await fetch(`${getcfdireporcomplemntf}companygroup=${companygroup}&company=${company}&cfditype=${cfditype}&paymentmethod=${paymentmethod}&pageSize=${pageSize}&pageNo=${pageNo}`, { method: 'GET', ...optionsDefault, })
            const json = await res.json()
            return json
        } else if (datestart != null && dateend != null) {
            if (company == null && cfditype == null && paymentmethod == null) {
                const res = await fetch(`${getcfdireporcomplemntf}companygroup=${companygroup}&datestart=${datestart}&dateend=${dateend}&pageSize=${pageSize}&pageNo=${pageNo}`, { method: 'GET', ...optionsDefault, })
                const json = await res.json()
                return json
            }
            if (company != null && cfditype == null && paymentmethod == null) {
                const res = await fetch(`${getcfdireporcomplemntf}companygroup=${companygroup}&company=${company}&dateend=${dateend}&pageSize=${pageSize}&pageNo=${pageNo}`, { method: 'GET', ...optionsDefault, })
                const json = await res.json()
                return json
            }
            if (company == null && cfditype != null && paymentmethod == null) {
                const res = await fetch(`${getcfdireporcomplemntf}companygroup=${companygroup}&cfditype=${cfditype}&dateend=${dateend}&pageSize=${pageSize}&pageNo=${pageNo}`, { method: 'GET', ...optionsDefault, })
                const json = await res.json()
                return json
            }
            if (company == null && cfditype == null && paymentmethod != null) {
                const res = await fetch(`${getcfdireporcomplemntf}companygroup=${companygroup}&paymentmethod=${paymentmethod}&dateend=${dateend}&pageSize=${pageSize}&pageNo=${pageNo}`, { method: 'GET', ...optionsDefault, })
                const json = await res.json()
                return json
            }
            if (company != null && cfditype == null && paymentmethod != null) {
                const res = await fetch(`${getcfdireporcomplemntf}companygroup=${companygroup}&company=${company}&paymentmethod=${paymentmethod}&dateend=${dateend}&pageSize=${pageSize}&pageNo=${pageNo}`, { method: 'GET', ...optionsDefault, })
                const json = await res.json()
                return json
            }
            if (company == null && cfditype != null && paymentmethod != null) {
                const res = await fetch(`${getcfdireporcomplemntf}companygroup=${companygroup}&company=${company}&cfditype=${cfditype}&paymentmethod=${paymentmethod}&dateend=${dateend}&pageSize=${pageSize}&pageNo=${pageNo}`, { method: 'GET', ...optionsDefault, })
                const json = await res.json()
                return json
            }
        }
    }
}
export default {...cfdiservicescomplementf }