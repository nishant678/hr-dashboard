import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { withBase } from "../../../config/apiConfig";

const useCompany = () => {
    const { token } = useAuth();
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) { setLoading(false); return; }
        const headers = { Authorization: `Bearer ${token}` };
        fetch(withBase("/api/company-admin/company"), { headers })
            .then(res => res.ok ? res.json() : null)
            .then(json => { if (json?.data) setCompany(json.data); })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [token]);

    return { company, loading };
};

export default useCompany;
