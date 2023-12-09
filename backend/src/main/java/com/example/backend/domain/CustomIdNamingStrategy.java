package com.example.backend.domain;

import org.hibernate.boot.model.naming.Identifier;
import org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl;
import org.hibernate.engine.jdbc.env.spi.JdbcEnvironment;

public class CustomIdNamingStrategy extends PhysicalNamingStrategyStandardImpl {

    private String currentTableName;

    @Override
    public Identifier toPhysicalColumnName(Identifier logicalName, JdbcEnvironment context) {
        if (logicalName == null) {
            return null;
        }

        if (currentTableName != null && logicalName.getText().equals("id")) {
            return Identifier.toIdentifier(currentTableName + "_id");
        }

        return super.toPhysicalColumnName(logicalName, context);
    }

    @Override
    public Identifier toPhysicalTableName(Identifier logicalName, JdbcEnvironment context) {
        currentTableName = logicalName.toString();

        return super.toPhysicalTableName(logicalName, context);
    }
}
