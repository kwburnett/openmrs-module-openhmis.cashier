/*
 * The contents of this file are subject to the OpenMRS Public License
 * Version 1.1 (the "License"); you may not use this file except in
 * compliance with the License. You may obtain a copy of the License at
 * http://license.openmrs.org
 *
 * Software distributed under the License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the
 * License for the specific language governing rights and limitations
 * under the License.
 *
 * Copyright (C) OpenMRS, LLC.  All Rights Reserved.
 */

package org.openmrs.module.openhmis.cashier.api.impl;

import org.apache.commons.lang.NotImplementedException;
import org.openmrs.api.APIException;
import org.openmrs.module.openhmis.cashier.api.IDepartmentService;
import org.openmrs.module.openhmis.cashier.api.db.hibernate.IGenericHibernateDAO;
import org.openmrs.module.openhmis.cashier.api.model.Department;

public class DepartmentServiceImpl
		extends BaseMetadataServiceImpl<IGenericHibernateDAO<Department>, Department> implements IDepartmentService {
	@Override
	protected void validate(Department entity) throws APIException {
		throw new NotImplementedException();
	}
}
