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

package org.openmrs.module.openhmis.cashier.api;

import org.openmrs.api.context.Context;
import org.openmrs.module.openhmis.cashier.api.model.Department;

public class IDepartmentServiceTest extends IMetadataServiceTest<IDepartmentService, Department> {
	public static final String DEPARTMENT_DATASET = "org/openmrs/module/openhmis/cashier/api/include/DepartmentTest.xml";

	@Override
	public void before() throws Exception{
		super.before();

		executeDataSet(DEPARTMENT_DATASET);
	}

	@Override
	protected IDepartmentService createService() {
		return Context.getService(IDepartmentService.class);
	}

	@Override
	protected int getTestEntityCount() {
		return 3;
	}

	@Override
	protected Department createEntity(boolean valid) {
		Department department = new Department();

		if (valid) {
			department.setName("new department");
		}

		department.setDescription("new department description");

		return department;
	}

	@Override
	protected void updateEntityFields(Department department) {
		department.setName(department.getName() + " updated");
		department.setDescription(department.getDescription() + " updated");
	}

	@Override
	protected void assertEntity(Department expected, Department actual) {
		super.assertEntity(expected, actual);
	}
}